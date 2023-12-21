import { Model, Column, DataType, Table, HasOne, BelongsTo, ForeignKey, BelongsToMany } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { NftCollectionTable } from "./nft_collections.model";



@Table({tableName:"liked_collections", createdAt: false, updatedAt: false})
export class LikedCollections extends Model<LikedCollections> {
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number

    @ForeignKey(()=>NftCollectionTable)
    @Column({type: DataType.INTEGER})
    collection_id: number;

    @ForeignKey(()=>User)
    @Column({type: DataType.INTEGER})
    user_id: number;
}
