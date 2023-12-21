import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users.model";
import { Nft } from "src/contracts/nfts/nfts.model";
import { NftCollectionTable } from "src/contracts/nft_collections/nft_collections.model";

export class AllInfoUserDto {
    @ApiProperty({type: User, description: "В том числе и liked"})
    user: User;

    @ApiProperty({type: [Nft]})
    nfts: Nft[];

    @ApiProperty({type: String, example: "1.4", description: "Количество ton на кошельке в привычном формате"})
    balance: string;
}