import { ApiProperty } from "@nestjs/swagger";

export class MessageDto {
    @ApiProperty({example: "EQChyNfRCa7qCOtlRhjTbEi3Ok_IPnMXhlHyLjzqq27QXOaG", description: "Адрес кошелька пользователя"})
    readonly address: string;
    @ApiProperty({required: true, example: "25403432", description: "Сумма транзакции"})
    readonly amount: string;
    
    @ApiProperty({required: false, description: "Забей"})
    readonly payload: null | string;
    @ApiProperty({required: false, description: "Вообще забей"})
    readonly stateInit: null | string;
}

export class TransactionMessageDto {
    @ApiProperty({type: [MessageDto]})
    readonly messages: MessageDto[]
}