import { Module } from '@nestjs/common';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';
import { InsuranceModule } from './insurance/insurance.module';
import { InsuranceTable } from './insurance/insurance.model';
import { InsuranceService } from './insurance/insurance.service';
import { NftCollectionsModule } from './nft_collections/nft_collections.module';
import { NftsModule } from './nfts/nfts.module';

@Module({
  imports: [InsuranceModule, NftCollectionsModule, NftsModule],
  controllers: [ContractsController],
  providers: [ContractsService],
  exports: [
    InsuranceModule, NftCollectionsModule, NftsModule
  ]
})
export class ContractsModule {}
