import { Module } from '@nestjs/common';
import { NftsService } from './nfts.service';
import { NftsController } from './nfts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Nft } from './nfts.model';
import { User } from 'src/users/users.model';
import { LikedNft } from './nfts-liked.model';

@Module({
  providers: [NftsService],
  controllers: [NftsController],
  imports: [
    SequelizeModule.forFeature([Nft, User, LikedNft])
  ],
  exports: [SequelizeModule, NftsService]
})
export class NftsModule {}
