import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { CreateInsuranceDto } from './dto/createInsurance.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InsuranceTable } from './insurance.model';

@ApiTags("Страховка")
@Controller('contracts/insurance')
export class InsuranceController {

    constructor(private insuranceService: InsuranceService){}

    @ApiOperation({summary: "Добавить в БД контракт страховки"})
    @ApiResponse({status: 200, type: InsuranceTable})
    @Post("/create")
    async create(@Body() dto : CreateInsuranceDto){
        return this.insuranceService.create(dto)
    }

    @ApiOperation({summary: "Найти страховку по адресу"})
    @ApiResponse({status: 200, type: InsuranceTable})
    @Get("/find/:address")
    async find(@Param("address") address: string){
        return this.insuranceService.findOne(address);
    }
}
