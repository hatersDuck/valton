message VoteScam {
    item_index: Int as uint32;
    voted: Bool;
    owner: Address;
}

message InternalScam {
    count_mint: Int;
    count_votes: Int;
}

message InternalNewPer {
    new_per_to_break: Int;
}

message InternalPay {
    prev_owner: Address;
}