import { ApiProperty } from "@nestjs/swagger";
import { Model, Column, DataType, Table, HasOne } from "sequelize-typescript";
import { NftCollectionTable } from "../nft_collections/nft_collections.model";


interface InsuranceCreationAttributes {
    address: string;
    timestamp_end: BigInt;
    mainnet: boolean;
}


@Table({tableName:"insurances"})
export class InsuranceTable extends Model<InsuranceTable, InsuranceCreationAttributes> {
    @ApiProperty({example: "EQChyNfRCa7qCOtlRhjTbEi3Ok_IPnMXhlHyLjzqq27QXOaG", description:"Адрес СОЗДАННОГО смарт-контракта страхования"})
    @Column({type: DataType.STRING, unique: true, allowNull: false, primaryKey:true})
    address: string;

    @ApiProperty({example: "1700830272", description: "Время окончания"})
    @Column({type: DataType.STRING})
    timestamp_end: string;

    @ApiProperty({example: "1000000000", description: "Объём на кошельке"})
    @Column({type: DataType.STRING})
    value: string;

    @ApiProperty({example: "false", description: "mainnet/testnet"})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    mainnet: boolean;

    @ApiProperty({example: "false", description: "SCAM"})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    scam: boolean;

    @ApiProperty({example: "500", description: "Процент для того, чтобы признать скамом"})
    @Column({type: DataType.STRING, defaultValue: 500})
    per_to_break: string;

    @ApiProperty({example: "0", description: "Количество скольким людям надо выплатить"})
    @Column({type: DataType.STRING, defaultValue: 0})
    count_pays: string;

    @ApiProperty({example: "0", description: "Количество замороженной валюты для выплат"})
    @Column({type: DataType.STRING, defaultValue: 0})
    frozen_coins: string;

    @HasOne(() => NftCollectionTable)
    collection: NftCollectionTable
}


