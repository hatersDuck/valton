// internal_vote_scam query_id:uint64 item_index:uint64 voted:bool owner:MsgAddress
message(0xDC3B16FD) InternalVoteScam {
    query_id: Int as uint64;
    item_index: Int as uint64;
    voted: Bool;
    owner: Address;
}

// internal_scam query_id:uint64 count_mint:uint32 count_votes:uint32
message(0xC1187F01) InternalScam {
    query_id: Int as uint64;
    count_mint: Int as uint32;
    count_votes: Int as uint32;
}

// internal_new_per query_id:uint64 new_per_to_break:uint32
message(0x0E602D91) InternalNewPer {
    query_id: Int as uint64;
    new_per_to_break: Int as uint32;
}

// internal_pay query_id:uint64 prev_owner:MsgAddress
message(0xF93D9BFB) InternalPay {
    query_id: Int as uint64;
    prev_owner: Address;
}

// vote_scam_client query_id:uint64
message(0x6109F417) VoteScamClient {
    query_id: Int as uint64;
}

// gratz_withdraw_all query_id:uint64
message(0xA32CCAF3) GratzWithdrawAll {
    query_id: Int as uint64;
}