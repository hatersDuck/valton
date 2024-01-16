import { Controller, Get, Param } from '@nestjs/common';
import { NftCollectionsService } from './nft_collections.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateNftCollectionInitInfoDto } from './dto/nft_collections-create.dto';

@Controller('contracts/nft-collections')
export class NftCollectionsController {

    constructor(private nftCollectionService : NftCollectionsService){}

    @ApiOperation({summary: "Берёт контент коллекции из блокчейна"})
    @ApiResponse({status: 200, type: CreateNftCollectionInitInfoDto})
    @Get("/get/:mainnet/:address")
    async testFun(@Param("address") address: string, @Param("mainnet") mainnet: boolean){
        return this.nftCollectionService.getCollectionContent(address, mainnet)
    }
    

}
