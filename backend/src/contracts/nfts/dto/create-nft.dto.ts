import { ApiProperty } from "@nestjs/swagger";

export class CreateNftDto {
    @ApiProperty({type: String, example: "EQChyNfRCa7qCOtlRhjTbEi3Ok_IPnMXhlHyLjzqq27QXOaG", description: "Адрес смарт контракта NFT"})
    readonly address: string;
}