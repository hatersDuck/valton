import "@stdlib/deploy";

import "./insurancable";
import "./imports/insurance_messages";


const TIME_CONTRACT: Int = 10;//60*60*24*379;
const MIN_COUNT_MINT: Int = 2;
const DENOMINATOR: Int = 1000;
const START_PER_TO_BREAK: Int = 500;

struct InsuranceData {
    nft_collection: Address;
    timestamp_end: Int as uint64;
    per_to_break: Int as uint16;

    frozen_coins: Int;
    count_pays: Int;
    scam: Bool;
}

contract Insurance with Deployable{
    nft_collection: Address;
    timestamp_end: Int as uint64;
    per_to_break: Int as uint16;

    scam: Bool = false;
    count_pays: Int as uint32 = 0;
    frozen_coins: Int as coins = 0;

    init(collection: Address) {
        self.nft_collection = collection;

        self.timestamp_end = now() + TIME_CONTRACT;
        self.per_to_break = START_PER_TO_BREAK;
    }

    fun gratz() {
        require(
            !self.scam,
            "Collection scam!"
        );
        require(
            self.timestamp_end - now() <= 0, 
            "Time hasn't ended"
        );

        if (!self.scam){
            send(SendParameters{
                to: self.nft_collection,
                bounce: false,
                value:0,
                mode: SendRemainingBalance + SendIgnoreErrors,
                body: "InternalGratz".asComment()
            });
        }
    }

    fun per_to_break_now(): Int {
        let x: Int = (TIME_CONTRACT - (self.timestamp_end - now())) * DENOMINATOR / TIME_CONTRACT;

        return START_PER_TO_BREAK + x * x * x/(4*DENOMINATOR*DENOMINATOR);
    }


    receive(){
        if (self.scam) {
            self.frozen_coins = self.frozen_coins + context().value;
        }
    }

    receive("withdraw all") {
        self.gratz();
    }

    receive(wt: GratzWithdrawAll) {
        self.gratz();
    }

    receive(scam: InternalScam) {
        require(
            sender() == self.nft_collection, 
            "Only for NFT collection"
            );

        self.per_to_break = self.per_to_break_now();

        if (((scam.count_votes * DENOMINATOR) / scam.count_mint > self.per_to_break) && (scam.count_mint > MIN_COUNT_MINT) && (self.time_left() > 0)) {
            self.scam = true;
            self.count_pays = scam.count_mint;
            let msgValue: Int = context().value / 2;

            send(SendParameters{
                to: self.nft_collection,
                bounce: false,
                value: msgValue,
                mode: SendIgnoreErrors,
                body: "Internal Scam".asComment()
            });

            self.frozen_coins = myBalance();
        } else if ((scam.count_mint > MIN_COUNT_MINT) && (self.time_left() > 0)){
            send(SendParameters{
                to: self.nft_collection,
                bounce: false,
                value: 0,
                mode: SendRemainingValue + SendIgnoreErrors,
                body: InternalNewPer{
                    query_id: scam.query_id,
                    new_per_to_break: self.per_to_break
                }.toCell()
            });
        } else if (self.time_left() <= 0) {
            self.gratz();
        }
    }

    receive(pay: InternalPay){
        require(
            sender() == self.nft_collection,
            "Only for NFT collection"
        );
        let value_insurance: Int = self.frozen_coins/self.count_pays;
        
        if (myBalance() > value_insurance){
            send(SendParameters{
                to: pay.prev_owner,
                bounce: false,
                value: value_insurance,
                mode: SendRemainingValue + SendIgnoreErrors,
                body: "insurance pay".asComment()
            });
        } else {
            send(SendParameters{
                to: pay.prev_owner,
                bounce: false,
                value: 0,
                mode: SendRemainingBalance + SendIgnoreErrors,
                body: "insurance pay".asComment()
            });
        }
    }

    get fun time_left(): Int {
        if self.timestamp_end < now(){
            return -1;
        }
        return self.timestamp_end - now();
    }

    get fun insurance_data(): InsuranceData {
        return InsuranceData{
            timestamp_end: self.timestamp_end,
            nft_collection: self.nft_collection,
            per_to_break: self.per_to_break_now(),
            scam: self.scam,
            frozen_coins: self.frozen_coins,
            count_pays: self.count_pays
        };
    }
    
    get fun balance(): Int {
        return myBalance();
    }
}