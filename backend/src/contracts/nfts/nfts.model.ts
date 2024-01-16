import { ApiProperty } from "@nestjs/swagger";
import { Model, Column, DataType, Table, HasOne, BelongsTo, ForeignKey, BelongsToMany } from "sequelize-typescript";
import { NftCollectionTable } from "../nft_collections/nft_collections.model";
import { User } from "src/users/users.model";
import { LikedNft } from "./nfts-liked.model";


interface NftCreationAttributes {
    address: string;
    address_owner: string;
    collection_id: number;
}


@Table({tableName:"nfts"})
export class Nft extends Model<Nft, NftCreationAttributes> {
    @ApiProperty({example: "1", description:"id nft в базе данных"})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number

    @ApiProperty({example: "EQB7fXomWDILcHJ18C2wGvtCbEY1Ll3eHZQ53ZJLAB7axjGp", description:"Адрес контракта NFT"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    address: string;

    @ApiProperty({example: "EQDg7c9NYvuOnxzYB8tCZyF6lHDwu54T9DmJP1rezeX7Vpsw", description:"Адрес владельца NFT"})
    @Column({type: DataType.STRING, allowNull:false})
    address_owner: string;

    @ApiProperty({type: "json", example: "{'color': red, 'cut':clear}", description:"Адрес владельца NFT"})
    @Column({type: DataType.JSON, defaultValue:{}})
    attrs: any;

    @ApiProperty({example: "false", description: "mainnet/testnet"})
    @Column({type: DataType.BOOLEAN})
    mainnet: boolean;

    @ApiProperty({example: "1", description:"id nft коллекции в базе данных"})
    @ForeignKey(()=>NftCollectionTable)
    @Column({type: DataType.INTEGER})
    collection_id: number;

    @BelongsTo(() => NftCollectionTable)
    collection: NftCollectionTable;

    @BelongsToMany(()=>User, ()=>LikedNft)
    users: User[]
}
