import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NftCollectionTable } from './nft_collections.model';
import { FilesService } from 'src/files/files.service';
import { getMethodBlockchain, useTonClient } from 'src/fiton/ton.client';
import { Address, Cell, TupleBuilder, TupleReader, beginCell, parseTuple } from '@ton/core';
import { loadCollectionData } from '../build/NftCollection/tact_NftCollection';
import { Axios } from 'axios';
import { jsonNftCollectionDataDto } from './dto/nft_collections-create.dto';

@Injectable()
export class NftCollectionsService {
    constructor(
        @InjectModel(NftCollectionTable)
        private nftCollectionRepository: typeof NftCollectionTable
    ) {}

    async findAllNftOwner(address_owner : string) {
        return this.nftCollectionRepository.findAll({
            where: {
                address_owner: address_owner
            }
        })
    }

    async findAllNftCollectionByIds(ids: number[]): Promise<NftCollectionTable[]> {
        return this.nftCollectionRepository.findAll({
        where: {
            id: ids
        }
        });;
    }

    async findOneNftCollectionByInsurance(insuranceAddress : string) {
        return this.nftCollectionRepository.findOne({
            where: {
                insurance_address: insuranceAddress
            }
        })
    }

    async findOneAddress(address : string) {
        return this.nftCollectionRepository.findOne({where: {
            address: address
        }, include: {all: true}})
    }

    async findOne(id : number){
        return this.nftCollectionRepository.findOne({where: {
            id
        }, include: {all: true}})
    }


    async getCollectionContent(address: string, mainnet: boolean) {
        const source = await getMethodBlockchain(address, mainnet, "get_collection_data");
        
        source.skip();
        let collection_content = source.readString();
        
        const axios = require('axios');
        const responce = await axios.get(collection_content);
        
        return {json_link: collection_content, data: responce.data};
    }

    
}
