import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Nft } from './nfts.model';
import { CreateNftDto } from './dto/create-nft.dto';

@Injectable()
export class NftsService {

    constructor(
        @InjectModel(Nft)
        private nftRepository: typeof Nft,
    ) {}

    async findAllNftOwner(address_owner : string) {
        return this.nftRepository.findAll({
            where: {
                address_owner: address_owner
            }
        })
    }

    async findAllNftCollection(collection_id : number) {
        return this.nftRepository.findAll({
            where: {
                collection_id: collection_id
            }
        })
    }

    async findAllNftByIds(ids: number[]): Promise<Nft[]> {
        return this.nftRepository.findAll({
        where: {
            id: ids
        }
        });;
    }

    async findOneAddress(address : string) {
        return this.nftRepository.findOne({where: {
            address: address
        }, include: {all: true}})
    }

    async findOne(id : number){
        return this.nftRepository.findOne({where: {
            id
        }, include: {all: true}})
    }

    async create(createDto : CreateNftDto) {
        // TODO Посмотреть как реализована фукнция sendTranscation в ton-connect
    }
}
