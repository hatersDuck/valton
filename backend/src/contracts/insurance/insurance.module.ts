import { Module } from '@nestjs/common';
import { InsuranceController } from './insurance.controller';
import { InsuranceService } from './insurance.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { InsuranceTable } from './insurance.model';

@Module({
  controllers: [InsuranceController],
  providers: [InsuranceService],
  imports: [
    SequelizeModule.forFeature([
      InsuranceTable
    ])
  ],
  exports: [
    InsuranceService
  ]
})
export class InsuranceModule {}
