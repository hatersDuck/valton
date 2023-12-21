import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionTable } from './transactions.model';
import { InsuranceModule } from 'src/contracts/insurance/insurance.module';
import { ContractsService } from 'src/contracts/contracts.service';
import { ContractsModule } from 'src/contracts/contracts.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [TransactionsService],
  controllers: [TransactionsController],
  imports: [
    SequelizeModule.forFeature([TransactionTable]), ContractsModule, FilesModule
  ]
})
export class TransactionsModule {}
