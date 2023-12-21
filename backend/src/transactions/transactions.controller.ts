import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateInsuranceDto, CreateInsuranceInitInfoDto } from 'src/contracts/insurance/dto/createInsurance.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionMessageDto } from './dto/transaction-message.dto';
import { TransactionCreateMessageDto } from './dto/transaction-create-message.dto';
import { TransactionCheckingDto} from './dto/transaction-update.dto';
import { TransactionTable } from './transactions.model';
import { CreateGratzInitInfoDto } from 'src/contracts/insurance/dto/messagesInsurance.dto';
import { validTransactionCreateMessageDto } from './support-functions';

@ApiTags("Транзакции")
@Controller('transactions')
export class TransactionsController {

    constructor(private transactionsService : TransactionsService){}

    // Sample
    @ApiOperation({summary: "Обновить статус транзакции, которую оплатил пользователь"})
    @ApiResponse({status: 200, type: TransactionTable})
    @Patch("update/status/checking")
    async successStatus(@Body() dto: TransactionCheckingDto){
        return this.transactionsService.reportCheckingTransaction(dto.result);
    }

    // INSURANCE
    @ApiOperation({summary: "Запрос тела транзакции для создания страховки"})
    @ApiResponse({status: 200, type: TransactionMessageDto})
    @Post("/create/insurance")
    async createInsurance(@Body() dto : TransactionCreateMessageDto){
        dto = validTransactionCreateMessageDto(dto);
        return this.transactionsService.createInsurance(dto);
    }

    @ApiOperation({summary: "Получить объект создания контракта"})
    @ApiResponse({status: 200, type: CreateInsuranceInitInfoDto})
    @Get("/create/insurance")
    async getInitInsurance(){
        return {nft_collection_address: "EQChyNfRCa7qCOtlRhjTbEi3Ok_IPnMXhlHyLjzqq27QXOaG"}
    }

    @ApiOperation({summary: "Активация выплаты владельцу коллекции"})
    @ApiResponse({status: 200, type: TransactionTable})
    @Post("create/gratz")
    async createGratz(@Body() dto: TransactionCreateMessageDto){
        dto = validTransactionCreateMessageDto(dto);
        return this.transactionsService.createGratz(dto);
    }

    @ApiOperation({summary: "Получить объект создания сообщения об выплате"})
    @ApiResponse({status: 200, type: CreateGratzInitInfoDto})
    @Get("create/gratz")
    async getInitGratz(){
        return {address_to: "EQChyNfRCa7qCOtlRhjTbEi3Ok_IPnMXhlHyLjzqq27QXOaG"}
    }

}
