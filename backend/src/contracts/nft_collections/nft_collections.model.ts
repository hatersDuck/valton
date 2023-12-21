import { Model, BelongsTo, Column, DataType, HasOne, Table, BelongsToMany, HasMany, ForeignKey } from "sequelize-typescript";

import { Nft } from "src/contracts/nfts/nfts.model";
import { InsuranceTable } from "../insurance/insurance.model";
import { User } from "src/users/users.model";
import { LikedCollections } from "./nft_collection-liked.model";


interface NftCollectionCreationAttributes {
    address: string;
    address_owner: string;
    insurance: string;
}


@Table({tableName:"nft_collections"})
export class NftCollectionTable extends Model<NftCollectionTable, NftCollectionCreationAttributes> {
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number
    
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    address: string;

    @Column({type: DataType.STRING, allowNull:false})
    address_owner: string;
    
    @Column({type: DataType.STRING, defaultValue:'inactive'})
    status: string;

    @Column({type: DataType.JSON, defaultValue: {}})
    attrs: any;

    @Column({type: DataType.BOOLEAN})
    mainnet: boolean;

    @ForeignKey(() => InsuranceTable)
    @Column({type:DataType.STRING})
    insurance_address: string;

    @BelongsTo(() => InsuranceTable)
    insurance: InsuranceTable;

    @HasMany(()=>Nft)
    nfts: Nft[];

    @BelongsToMany(()=>User, ()=>LikedCollections)
    users: User[]
}