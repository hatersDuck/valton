import { Module } from '@nestjs/common';
import { NftCollectionsController } from './nft_collections.controller';
import { NftCollectionsService } from './nft_collections.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { NftCollectionTable } from './nft_collections.model';
import { FilesModule } from 'src/files/files.module';
import { User } from 'src/users/users.model';
import { LikedCollections } from './nft_collection-liked.model';

@Module({
  controllers: [NftCollectionsController],
  providers: [NftCollectionsService],
  imports: [
    SequelizeModule.forFeature([NftCollectionTable, User, LikedCollections]),
    FilesModule
  ],
  exports: [SequelizeModule, NftCollectionsService]
})
export class NftCollectionsModule {}
