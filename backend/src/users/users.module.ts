import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { AuthModule } from 'src/auth/auth.module';
import { NftsModule } from 'src/contracts/nfts/nfts.module';
import { NftCollectionsModule } from 'src/contracts/nft_collections/nft_collections.module';
import { Nft } from 'src/contracts/nfts/nfts.model';
import { NftCollectionTable } from 'src/contracts/nft_collections/nft_collections.model';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([User, Nft, NftCollectionTable]),
        forwardRef(() => AuthModule),
        NftsModule,
        NftCollectionsModule
    ],
    exports: [SequelizeModule, UsersService]
})
export class UsersModule { }
