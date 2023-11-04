import "@stdlib/deploy";
import "@stdlib/ownable";

import "./imports/messages";
import "./imports/insurance_messages";

import "./nft_item";
import "./insurance";

struct ScamInfo {
    scam: Bool;
    contract_end: Bool;
    count_votes: Int as uint32;
    per_fill: Int as uint16;
}

trait InsurancableCollection with Ownable {
    // Maybe EDIT
    collection_content: Cell;
    
    virtual fun NftItemInit(item_index: Int): StateInit {
        return initOf NftItem(myAddress(), item_index, self.owner, self.collection_content, self.owner);
    }
    // Dont Tread On Me
    scam: Bool;
    contract_end: Bool;
    count_votes: Int;
    per_to_break: Int;
    owner: Address;
    next_item_index: Int;
    
    fun now_per_fill(): Int {
        if (self.next_item_index == 0) {
            return 0;
        }
        return self.count_votes * 1000 / self.next_item_index;
    }
    
    fun checkScam() {
        if (self.now_per_fill() > self.per_to_break && self.next_item_index > MIN_COUNT_MINT) {
            send(SendParameters {
                to: self.insurance_address(),
                value: 0,
                bounce: false,
                mode: SendRemainingValue + SendIgnoreErrors,
                body: InternalScam{
                    count_mint: self.next_item_index,
                    count_votes: self.count_votes
                }.toCell()
            });
        }
    }

    receive("InternalGratz"){
        require(
            sender() == self.insurance_address(), 
            "Only for Insurance contract"
            );
        self.contract_end = true;
        send(SendParameters{
            to: self.owner,
            value: 0,
            bounce: false,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: "Thanks for your collaboration!".asComment()
        });
    }

    receive("Internal Scam"){
        require(
            sender() == self.insurance_address(), 
            "Only for Insurance contract"
            );

        self.scam = true;
    }

    receive(vote: VoteScam){
        require(
            sender() == contractAddress(self.NftItemInit(vote.item_index)), 
            "Only for NFT from collection"
        );
        require(
            !self.contract_end,
            "Contract end time"
        );

        if (self.scam) {
            send(SendParameters{
                to: vote.owner,
                value: 0,
                bounce: false,
                mode: SendRemainingValue + SendIgnoreErrors,
                body: "The collection has already been recognized as a scam".asComment()
            });
        } else {
            let comment: StringBuilder = beginComment();
            
            comment.append("vote for ");
            if (vote.voted) {
                self.count_votes = self.count_votes - 1;
                comment.append("no scam ");
            } else {
                self.count_votes = self.count_votes + 1;
                comment.append("scam ");
                
                self.checkScam();
            }
            comment.append("accepted!");

            send(SendParameters{
                to: vote.owner,
                value: 0,
                bounce: false,
                mode: SendRemainingValue + SendIgnoreErrors,
                body: comment.toCell()
            });
        }
    }

    receive(internal: InternalNewPer) {
        require(
            sender() == self.insurance_address(), 
            "Only for Insurance contract"
            );

        self.per_to_break = internal.new_per_to_break;
        self.checkScam();
    }

    receive (nft_message: OwnershipAssigned) {
        let nft_address: Address = contractAddress(
            self.NftItemInit(nft_message.query_id));

        if (sender() == nft_address) {
            if (self.scam) {
                send(SendParameters{
                    to: self.insurance_address(),
                    value: 0,
                    bounce: false,
                    mode: SendRemainingValue+SendIgnoreErrors,
                    body: InternalPay{
                        prev_owner: nft_message.prev_owner
                    }.toCell()
                });
            } else {
                send(SendParameters {
                    to: sender(),
                    value: 0,
                    mode: SendRemainingValue,
                    body: Transfer{
                            query_id: nft_message.query_id,
                            new_owner: nft_message.prev_owner, 
                            response_destination: nft_message.prev_owner,
                            custom_payload: "Collection not scam".asComment(),
                            forward_amount: 0, 
                            forward_payload: emptySlice()
                    }.toCell()
                });  
            }       
        }
    }

    get fun insurance_address(): Address {
        return contractAddress(initOf Insurance(myAddress()));
    }

    get fun scam_info(): ScamInfo {
        return ScamInfo{
            scam: self.scam,
            count_votes: self.count_votes,
            per_fill: self.now_per_fill(),
            contract_end: self.contract_end
        };
    }
}


trait InsurancableItem with Ownable {
    owner: Address;
    collection_address: Address;
    voted_scam: Bool;
    item_index: Int;

    receive("Vote"){
        require(
            sender() == self.owner, 
            "Only The Owner can vote"
            );

        send(SendParameters{
            to: self.collection_address,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: VoteScam{
                item_index: self.item_index,
                voted: self.voted_scam,
                owner: self.owner
            }.toCell()
        });

        self.voted_scam = !self.voted_scam;
    }

    get fun voted(): Bool{
        return self.voted_scam;
    }
}