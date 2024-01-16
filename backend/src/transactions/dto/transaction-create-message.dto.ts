import { ApiProperty } from "@nestjs/swagger";
import { CreateInsuranceInitInfoDto } from "src/contracts/insurance/dto/createInsurance.dto";
import { CreateNftCollectionInitInfoDto } from "src/contracts/nft_collections/dto/nft_collections-create.dto";

export class TransactionCreateMessageDto {
    @ApiProperty({type: String, example: "kQDVxgzu_SiFhGmCjDKwJfZFbOnUy1ZgcaKtHNhS9_7dYxOI", description: "Кошелёк отправителя"})
    address: string;

    @ApiProperty({type:Boolean, example: false, description: "mainnet/testnet"})
    mainnet: boolean;

    @ApiProperty({type: Object || CreateInsuranceInitInfoDto, description: "Тело транзакции"})
    initInfo: any | CreateInsuranceInitInfoDto | CreateNftCollectionInitInfoDto;
}