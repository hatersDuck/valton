import { HttpException, HttpStatus } from "@nestjs/common";
import { Address, beginCell } from "@ton/core";
import { NftCollection } from "src/contracts/build/NftCollection/tact_NftCollection";
import { CreateNftCollectionInitInfoDto, jsonNftCollectionDataDto, jsonRoyaltyParams } from "src/contracts/nft_collections/dto/nft_collections-create.dto";
import { DEFAULT_COLLECTION } from "src/contracts/nft_collections/nft-collections-type";


export async function createCollectionContract(initInfo: CreateNftCollectionInitInfoDto){
    switch (initInfo.type) {
        case DEFAULT_COLLECTION:
            return defaultCreate(initInfo)
        default:
            throw new HttpException("Неизветсный тип контракта коллекции", HttpStatus.BAD_REQUEST)
    }
}

function defaultCreate(initInfo: CreateNftCollectionInitInfoDto) {
    let newContent = beginCell().storeInt(0x01, 8).storeStringRefTail(initInfo.content_url).endCell();

    return NftCollection.fromInit(
        Address.parse(initInfo.address_owner), 
        newContent, 
        {
            $$type: "RoyaltyParams",
            numerator: BigInt(initInfo.royalty.numerator),
            denominator: BigInt(initInfo.royalty.denominator),
            destination: Address.parse(initInfo.royalty.destination),
        }
    )
}
