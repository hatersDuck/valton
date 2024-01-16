import { ApiProperty } from "@nestjs/swagger";

interface TransactionCreationAttribures {
    address_from: string;
    address_to: string;
    volume: string;
    type: string;
    status: string;
    mainnet: boolean;
    attrs: any;
}

export class TransactionCreateDto {
    @ApiProperty({type: String, example: "kQDVxgzu_SiFhGmCjDKwJfZFbOnUy1ZgcaKtHNhS9_7dYxOI", description: "Кошелёк отправителя"})
    address_from: string;

    @ApiProperty({type: String, example: "kQDVxgzu_SiFhGmCjDKwJfZFbOnUy1ZgcaKtHNhS9_7dYxOI", description: "Кошелёк отправителя"})
    address_to: string;

    @ApiProperty({required: true, example: "25403432", description: "Сумма транзакции или 0 если это транзакция создания"})
    volume: string;

    @ApiProperty({required: true, example: "create", description: "Тип транзакции"})
    type: string;

    @ApiProperty({required: true, example: "active", description: "Статус транзакции"})
    status: string;

    @ApiProperty({type:Boolean, example: false, description: "mainnet/testnet"})
    mainnet: boolean;

    @ApiProperty({type:Object, example: "{'initInfo': {'nft_collection_address': 'kQDVxgzu_SiFhGmCjDKwJfZFbOnUy1ZgcaKtHNhS9_7dYxOI'}}", description: "mainnet/testnet"})
    attrs: any;
}