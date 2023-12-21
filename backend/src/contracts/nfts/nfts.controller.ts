import { Controller, Get, Param } from '@nestjs/common';
import { NftsService } from './nfts.service';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Nft } from './nfts.model';

@ApiTags("НФТ")
@Controller('contracts/nfts')
export class NftsController {

    constructor (private nftsService : NftsService){}

    @ApiOperation({summary: "Взять все nft определённого пользователя"})
    @ApiResponse({status: 200, type: [Nft]})
    @Get("/find/owner/:address_owner")
    async findAllNftOwner(@Param("address_owner") address_owner : string) {
        return this.nftsService.findAllNftOwner(address_owner);
    }

    @ApiOperation({summary: "Взять все nft определённой коллекции"})
    @ApiResponse({status: 200, type: [Nft]})
    @Get("/find/collection/:collection_id")
    async findAllNftCollection(@Param("collection_id") collection_id : number) {
        return this.nftsService.findAllNftCollection(collection_id);
    }

    @ApiOperation({summary: "Взять nft по адресу"})
    @ApiResponse({status: 200, type: Nft})
    @Get("/find/address/:address")
    async findOneAddress(@Param("address") address : string) {
        return this.nftsService.findOneAddress(address);
    }

    @ApiOperation({summary: "Взять nft по id"})
    @ApiResponse({status: 200, type: Nft})
    @Get("find/id/:id")
    async findOne(@Param("id") id : number){
        return this.nftsService.findOne(id);
    }
}
