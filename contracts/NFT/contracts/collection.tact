import "@stdlib/deploy";
import "./item.tact";


contract Collection with Deployable {
    const minTonsForStorage: Int = ton("0.03");
    const gasConsumption: Int = ton("0.03");


    next_item_index: Int as uint32 = 0;
    scam_count: Int as uint32 = 0;

    owner_adress: Address;
    collection_content: Cell;
    royalty_params: RoyaltyParams;

    init(owner_adress: Address, collection_content: Cell, royalty_params: RoyaltyParams) {
        self.owner_adress = owner_adress;
        self.collection_content = collection_content;
        self.royalty_params = royalty_params; 
    }

    receive("Mint"){
        let ctx: Context = context();
        let msgValue: Int = ctx.value;
        let tonBalanceBeforeMsg: Int = myBalance() - msgValue;
        let storageFee: Int = minTonsForStorage - min(tonBalanceBeforeMsg, minTonsForStorage);
        msgValue = msgValue - (storageFee + gasConsumption);
        self.mint(ctx.sender, msgValue);
    }

    // ===== Private Methods ===== //
    fun mint(sender: Address, msgValue: Int) {
        require(self.next_item_index >= 0, "non-sequential NFTs");
        let nft_init: StateInit = self.getItemInit(self.next_item_index);
        send(SendParameters{
                to: contractAddress(nft_init), 
                value: msgValue, 
                bounce: false,
                mode: SendIgnoreErrors,
                body: Transfer {
                    query_id: 0,
                    new_owner: sender,
                    response_destination: self.owner_address,
                    custom_payload: emptyCell(),
                    forward_amount: 0,
                    forward_payload: emptySlice()
                }.toCell(),
                code: nft_init.code,
                data: nft_init.data
            });
        self.next_item_index = self.next_item_index + 1;
    }

    get fun getItemInit(item_index: Int): StateInit {
        return initOf Item(myAddress(), item_index, self.owner_address, self.collection_content);
    }
}


struct RoyaltyParams {
    numerator: Int;
    denominator: Int;
    destination: Address;
}