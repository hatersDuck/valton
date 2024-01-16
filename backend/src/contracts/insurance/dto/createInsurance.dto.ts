import { ApiProperty } from "@nestjs/swagger";

export class CreateInsuranceDto {
    @ApiProperty({type: String, example: "EQChyNfRCa7qCOtlRhjTbEi3Ok_IPnMXhlHyLjzqq27QXOaG", description: "Адрес смарт контракта страховки"})
    readonly address: string;

    @ApiProperty({type: Number, example: "false", description: "Сеть -239 == True, -3 == False"})
    readonly mainnet: boolean;
}

export class CreateInsuranceInitInfoDto{
    @ApiProperty({type: String, example: "EQChyNfRCa7qCOtlRhjTbEi3Ok_IPnMXhlHyLjzqq27QXOaG", description: "Адрес смарт контракта НФТ коллекции"})
    readonly nft_collection_address: string;
}