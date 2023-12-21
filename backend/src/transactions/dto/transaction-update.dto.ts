import { ApiProperty } from "@nestjs/swagger";

export class TransactionCheckingDto {
    @ApiProperty({description: "Ответ от TON-connect-sdk, если успешно"})
    result: string
}