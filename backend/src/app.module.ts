import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { NftsModule } from './contracts/nfts/nfts.module';
import { NftCollectionsModule } from './contracts/nft_collections/nft_collections.module';
import { InsuranceTable } from './contracts/insurance/insurance.model';
import { Nft } from './contracts/nfts/nfts.model';
import { NftCollectionTable } from './contracts/nft_collections/nft_collections.model';
import { AuthModule } from './auth/auth.module';
import { ContractsModule } from './contracts/contracts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TransactionTable } from './transactions/transactions.model';
import { FilesModule } from './files/files.module';
import { LikedCollections } from './contracts/nft_collections/nft_collection-liked.model';
import { LikedNft } from './contracts/nfts/nfts-liked.model';

@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database:process.env.POSTGRES_DB,
      models: [
        Nft, User, InsuranceTable, NftCollectionTable, TransactionTable,
        LikedCollections, LikedNft 
      ],
      autoLoadModels: true
    }),
    
    UsersModule, AuthModule, ContractsModule, TransactionsModule, FilesModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
