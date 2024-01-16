import { Model, Column, DataType, Table, HasOne, BelongsTo, ForeignKey, BelongsToMany } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Nft } from "./nfts.model";


@Table({tableName:"liked_nfts", createdAt: false, updatedAt: false})
export class LikedNft extends Model<LikedNft> {
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number

    @ForeignKey(()=>Nft)
    @Column({type: DataType.INTEGER})
    nft_id: number;

    @ForeignKey(()=>User)
    @Column({type: DataType.INTEGER})
    user_id: number;
}
