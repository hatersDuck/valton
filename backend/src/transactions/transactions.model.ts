import { ApiProperty } from "@nestjs/swagger";
import { Model, Column, DataType, Table, HasOne, BelongsTo, ForeignKey } from "sequelize-typescript";

interface TransactionCreationAttribures {
    address_from: string;
    address_to: string;
    volume: string;
    type: string;
    status: string;
    mainnet: boolean;
    attrs: any;
}


@Table({tableName:"transactions"})
export class TransactionTable extends Model<TransactionTable, TransactionCreationAttribures> {
    @ApiProperty({example: "1", description:"id nft в базе данных"})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number

    @ApiProperty({example: "EQB7fXomWDILcHJ18C2wGvtCbEY1Ll3eHZQ53ZJLAB7axjGp", description:"Адрес контракта отправителя"})
    @Column({type: DataType.STRING, allowNull: false})
    address_from: string;

    @ApiProperty({example: "EQDg7c9NYvuOnxzYB8tCZyF6lHDwu54T9DmJP1rezeX7Vpsw", description:"Адрес владельца получателя"})
    @Column({type: DataType.STRING, allowNull:false})
    address_to: string;

    @ApiProperty({example: "1000000000", description:"Объём транзакции"})
    @Column({type: DataType.STRING})
    volume: string;

    @ApiProperty({example: "active", description:"Статус транзакции"})
    @Column({type: DataType.STRING})
    status: string;

    @ApiProperty({example: "buy", description:"Тип транзакции"})
    @Column({type: DataType.STRING})
    type: string;

    @ApiProperty({example: "false", description: "mainnet/testnet"})
    @Column({type: DataType.BOOLEAN})
    mainnet: boolean;

    @ApiProperty({type:"json", description: "Дополнительные данные транзакции"})
    @Column({type: DataType.JSON, defaultValue:{}})
    attrs: any;

    @ApiProperty({type:String, description: "Хэш транзакции"})
    @Column({type: DataType.STRING, defaultValue:""})
    hash: string;
}
