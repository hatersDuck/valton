import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TransactionTable } from './transactions.model'
import { useTonClient } from 'src/fiton/ton.client';

import { Address, Builder, Cell, Contract, Slice, beginCell, storeStateInit, toNano } from '@ton/core';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionCreateDto } from './dto/transaction.create';
import { TransactionCreateMessageDto } from './dto/transaction-create-message.dto';
import { InsuranceService } from 'src/contracts/insurance/insurance.service';
import { FitonAddress } from 'src/fiton/fiton.address';
import { FilesService } from 'src/files/files.service';
import { CANCEL, CHECKING, SUCCESS, WAITING } from './consts/status';
import { DEPLOY, GRATZ } from './consts/types_transactions';
import { INSURANCE, MESSAGE, NFT_COLLECION } from './consts/types_contracts';
import { Insurance, storeDeploy } from 'src/contracts/build/NftCollection/tact_Insurance';
import { NftCollection, storeGratzWithdrawAll, } from 'src/contracts/build/NftCollection/tact_NftCollection';
import { MessageDto, TransactionMessageDto } from './dto/transaction-message.dto';
import { deployContract } from './deploy-transactions';
import { createCollectionContract } from './nftCollection-transactions';
import { CreateGratzInitInfoDto } from 'src/contracts/insurance/dto/messagesInsurance.dto';

@Injectable()
export class TransactionsService {

    constructor(
        @InjectModel(TransactionTable)
        private transactionRepository: typeof TransactionTable,
        private insuranceService: InsuranceService,
        private fileService: FilesService) { }


    async findOne(id: number) {
        return this.transactionRepository.findOne({ where: { id } })
    }

    async createTransaction(dto: TransactionCreateDto) {
        return this.transactionRepository.create(dto)
    }

    async reportCheckingTransaction(rst: string) {
        const cs = Cell.fromBase64(rst).beginParse();
        switch (cs.loadUint(32)) {
            case DEPLOY.uint:
                const id = cs.loadUint(64);
                const trn = await this.findOne(id);
                if (trn.status === WAITING)
                    trn.status = CHECKING;
                return trn.save()
            default:
                throw new HttpException("Неизвестная транзакция", HttpStatus.CONFLICT)
        }
    }

    getStartTranstInfo(dto: TransactionCreateMessageDto, address_to: Address, type: string): TransactionCreateDto {
        const transact = new TransactionCreateDto;
        transact.address_from = dto.address;
        transact.address_to = address_to.toString();
        transact.attrs = {
            type: type,
            initInfo: dto.initInfo
        };
        transact.mainnet = dto.mainnet;
        transact.status = WAITING;

        return transact
    }

    getTransactDeployInfo(transact: TransactionCreateDto): TransactionCreateDto {
        transact.type = DEPLOY.str;
        transact.volume = "0";
        return transact;
    }

    async addDeployTransactDB(dto: TransactionCreateMessageDto, contract: Contract, type: string): Promise<bigint> {
        const createTransactInfo = this.getTransactDeployInfo(
            this.getStartTranstInfo(dto, contract.address, type)
        );
        const prom = await this.createTransaction(createTransactInfo);

        return BigInt(prom.id)
    }
    //      [[[[[[[        INSURANCE        ]]]]]]]
    async createInsurance(dto: TransactionCreateMessageDto) {
        const insuranceContract = await Insurance.fromInit(Address.parse(dto.initInfo.nft_collection_address));
        const id = await this.addDeployTransactDB(dto, insuranceContract, INSURANCE)
        return deployContract(id, insuranceContract);
    }

    async createGratz(dto: TransactionCreateMessageDto) {
        const transact = this.getStartTranstInfo(dto, Address.parse(dto.initInfo.address_to), GRATZ.str);
        transact.type = MESSAGE;
        transact.volume = "0";
        const prom = await this.createTransaction(transact);
        
        const payload = beginCell().store(storeGratzWithdrawAll(
            {
                $$type: "GratzWithdrawAll",
                query_id: BigInt(prom.id)
            }
        )).endCell();

        return {
            messages: [{
                address: dto.initInfo.address_to,  
                amount: toNano("0.04").toString(),  
                payload: payload.toBoc().toString("base64")
            }]
        }
    }

    //      [[[[[[[        NFT_COLLECTION        ]]]]]]]
    async createNftCollection(dto: TransactionCreateMessageDto) {
        const nftCollectionContract = await createCollectionContract(dto.initInfo)
        const id = await this.addDeployTransactDB(dto, nftCollectionContract, NFT_COLLECION)
        return deployContract(id, nftCollectionContract);
    }

    //      [[[[[[[        NFT_SINGLE        ]]]]]]]

    //      [[[[[[[        BUY        ]]]]]]]

    //      [[[[[[[        AUCTION        ]]]]]]]

    //      [[[[[[[        TRADE OFFER        ]]]]]]]

}
