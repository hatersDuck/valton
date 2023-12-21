import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InsuranceTable } from './insurance.model';
import { useTonClient } from 'src/fiton/ton.client';
import { Address, OpenedContract } from '@ton/core';
import { CreateInsuranceDto } from './dto/createInsurance.dto';
import { Insurance } from '../build/NftCollection/tact_Insurance';


@Injectable()
export class InsuranceService {

    constructor (
        @InjectModel(InsuranceTable)
        private insuranceRepository: typeof InsuranceTable
    ) {}

    async findOne(address: string) {
        const insurance = await this.insuranceRepository.findOne({where:{address}, include: {all:true}});
        if (insurance)
            return this.autoUpdate(insurance);

        return insurance;
    }

    async create(createDto:CreateInsuranceDto) {
        let insurance = await this.findOne(createDto.address);

        if (insurance===null) {
            const contract = await this.getInsuranceContract(createDto);

            const timestamp_end = (await contract.getInsuranceData()).timestamp_end;
            insurance = await this.insuranceRepository.create({
                address: createDto.address,
                timestamp_end: timestamp_end,
                mainnet: createDto.mainnet
            })
        }
        
        return this.autoUpdate(insurance) 
    }

    async autoUpdate(insurance: InsuranceTable) {
        const contract = await this.getInsuranceContract({address: insurance.address, mainnet: insurance.mainnet});
        
        const data = await contract.getInsuranceData();

        insurance.value = (await contract.getBalance()).toString();
        insurance.scam = data.scam;

        if (BigInt(Date.now()) < BigInt(insurance.timestamp_end)) {
            insurance.per_to_break = data.per_to_break.toString();
            if (data.scam){
                insurance.count_pays = data.count_pays.toString();
                insurance.frozen_coins = data.frozen_coins.toString();
            }
        } else {
            insurance.per_to_break = "0";
        }
        
        await insurance.save();
        return insurance;
    }

    async getInsuranceContract(dto : CreateInsuranceDto): Promise<OpenedContract<Insurance>>{
        const client = await useTonClient(dto.mainnet)

        const insuranceContract = Insurance.fromAddress(Address.parse(dto.address))

        return client.open(insuranceContract) as OpenedContract<Insurance>
    } 
}
