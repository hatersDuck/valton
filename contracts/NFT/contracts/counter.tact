import "@stdlib/deploy"; 

message Add {
    amount: Int as uint32;
}

contract Counter with Deployable{
    count: Int as uint32;
    last_message: String? = null;
    last_sender: Address? = null;

    init() {
        self.count = 0;
    }
    
    receive("plus"){
        let ctx: Context = context();
        self.last_message = "plus";
        self.last_sender = ctx.sender;
        self.count = self.count + 1;
    }

    receive("minus"){
        let ctx: Context = context();
        self.last_message = "minus";
        self.last_sender = ctx.sender;
        self.count = self.count - 1;
    }

    receive(msg:Add){
        self.count = self.count + msg.amount;
    }
    get fun counter(): Int{
        return self.count;
    }

    get fun last_msg(): String?{
        return self.last_message;
    }

    get fun last_sender(): Address?{
        return self.last_sender;
    }
    
}
