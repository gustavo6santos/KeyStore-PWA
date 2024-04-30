import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopSchema } from './shop.schema';
import { ShopModel } from './shop.model';

@Module({
  providers: [ShopService],
  controllers: [ShopController],
  imports:[MongooseModule.forFeature([{ name: 'shops', schema: ShopSchema }]), 
  MongooseModule.forRoot('mongodb+srv://keystore:NsQHM43ExvP7BM3R@cluster0.elzyrqf.mongodb.net/Shop_DB')],
})
export class ShopModule {}
