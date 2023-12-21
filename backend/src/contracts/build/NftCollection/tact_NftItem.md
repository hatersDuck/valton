# TACT Compilation Report
Contract: NftItem
BOC Size: 2365 bytes

# Types
Total Types: 30

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## Transfer
TLB: `transfer#5fcc3d14 query_id:uint64 new_owner:address response_destination:address custom_payload:Maybe ^cell forward_amount:coins forward_payload:remainder<slice> = Transfer`
Signature: `Transfer{query_id:uint64,new_owner:address,response_destination:address,custom_payload:Maybe ^cell,forward_amount:coins,forward_payload:remainder<slice>}`

## OwnershipAssigned
TLB: `ownership_assigned#05138d91 query_id:uint64 prev_owner:address forward_payload:remainder<slice> = OwnershipAssigned`
Signature: `OwnershipAssigned{query_id:uint64,prev_owner:address,forward_payload:remainder<slice>}`

## Excesses
TLB: `excesses#d53276db query_id:uint64 = Excesses`
Signature: `Excesses{query_id:uint64}`

## GetStaticData
TLB: `get_static_data#2fcb26a2 query_id:uint64 = GetStaticData`
Signature: `GetStaticData{query_id:uint64}`

## TransferEditorship
TLB: `transfer_editorship#f2541d32 query_id:uint64 new_editor:address response_destination:address forward_amount:coins forward_payload:remainder<slice> = TransferEditorship`
Signature: `TransferEditorship{query_id:uint64,new_editor:address,response_destination:address,forward_amount:coins,forward_payload:remainder<slice>}`

## EditorshipAssigned
TLB: `editorship_assigned#183d47c6 query_id:uint64 prev_editor:address forward_payload:remainder<slice> = EditorshipAssigned`
Signature: `EditorshipAssigned{query_id:uint64,prev_editor:address,forward_payload:remainder<slice>}`

## UpdateNftContent
TLB: `update_nft_content#df6cad1c query_id:uint64 new_content:^cell = UpdateNftContent`
Signature: `UpdateNftContent{query_id:uint64,new_content:^cell}`

## UpdateCollectionContent
TLB: `update_collection_content#f2ab7b42 query_id:uint64 new_content:^cell numerator:uint16 denominator:uint16 destination:address = UpdateCollectionContent`
Signature: `UpdateCollectionContent{query_id:uint64,new_content:^cell,numerator:uint16,denominator:uint16,destination:address}`

## ReportStaticData
TLB: `report_static_data#8b771735 query_id:uint64 index_id:uint32 collection:address = ReportStaticData`
Signature: `ReportStaticData{query_id:uint64,index_id:uint32,collection:address}`

## GetRoyaltyParams
TLB: `get_royalty_params#693d3950 query_id:uint64 = GetRoyaltyParams`
Signature: `GetRoyaltyParams{query_id:uint64}`

## ReportRoyaltyParams
TLB: `report_royalty_params#a8cb00ad query_id:uint64 numerator:uint16 denominator:uint16 destination:address = ReportRoyaltyParams`
Signature: `ReportRoyaltyParams{query_id:uint64,numerator:uint16,denominator:uint16,destination:address}`

## GetNftData
TLB: `_ is_initialized:bool index:uint32 collection_address:address owner:address individual_content:^cell editor:address = GetNftData`
Signature: `GetNftData{is_initialized:bool,index:uint32,collection_address:address,owner:address,individual_content:^cell,editor:address}`

## ScamInfo
TLB: `_ scam:bool contract_end:bool count_votes:uint32 per_fill:uint16 = ScamInfo`
Signature: `ScamInfo{scam:bool,contract_end:bool,count_votes:uint32,per_fill:uint16}`

## InternalVoteScam
TLB: `internal_vote_scam#dc3b16fd query_id:uint64 item_index:uint64 voted:bool owner:address = InternalVoteScam`
Signature: `InternalVoteScam{query_id:uint64,item_index:uint64,voted:bool,owner:address}`

## InternalScam
TLB: `internal_scam#c1187f01 query_id:uint64 count_mint:uint32 count_votes:uint32 = InternalScam`
Signature: `InternalScam{query_id:uint64,count_mint:uint32,count_votes:uint32}`

## InternalNewPer
TLB: `internal_new_per#0e602d91 query_id:uint64 new_per_to_break:uint32 = InternalNewPer`
Signature: `InternalNewPer{query_id:uint64,new_per_to_break:uint32}`

## InternalPay
TLB: `internal_pay#f93d9bfb query_id:uint64 prev_owner:address = InternalPay`
Signature: `InternalPay{query_id:uint64,prev_owner:address}`

## VoteScamClient
TLB: `vote_scam_client#6109f417 query_id:uint64 = VoteScamClient`
Signature: `VoteScamClient{query_id:uint64}`

## GratzWithdrawAll
TLB: `gratz_withdraw_all#a32ccaf3 query_id:uint64 = GratzWithdrawAll`
Signature: `GratzWithdrawAll{query_id:uint64}`

## InsuranceData
TLB: `_ nft_collection:address timestamp_end:uint64 per_to_break:uint16 frozen_coins:int257 count_pays:int257 scam:bool = InsuranceData`
Signature: `InsuranceData{nft_collection:address,timestamp_end:uint64,per_to_break:uint16,frozen_coins:int257,count_pays:int257,scam:bool}`

## CollectionData
TLB: `_ next_item_index:uint32 collection_content:^cell owner:address = CollectionData`
Signature: `CollectionData{next_item_index:uint32,collection_content:^cell,owner:address}`

## RoyaltyParams
TLB: `_ numerator:uint16 denominator:uint16 destination:address = RoyaltyParams`
Signature: `RoyaltyParams{numerator:uint16,denominator:uint16,destination:address}`

# Get Methods
Total Get Methods: 3

## get_nft_data

## voted

## owner

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
13808: Collection scam!
14384: Only The Owner can vote
38310: Only for NFT from collection
44199: Time hasn't ended
45947: Only for NFT collection
46450: Only for Insurance contract
54178: invalid amount
61686: access denied
62742: non-sequential NFTs