import "@stdlib/deploy";

// import "./collection.tact";
// import "./item.tact";

contract Insurance with Deployable{
    
    owner_adress: Address;
    timestamp_end: Int as uint256;
    
    //nft_collection: Address;

    init(owner_adress: Address) {
        self.owner_adress = owner_adress;
        self.timestamp_end = now(); // add 1 year
    }
    
    get fun time_left(): Int {
        return now() - self.timestamp_end;
    }
}
