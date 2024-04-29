import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopSchema } from './shop.schema';
import { MongooseModule } from "@nestjs/mongoose";
import { ShopService } from './shop.service';

@Module({
    controllers: [ShopController],
    providers:[ShopService],
    imports:[MongooseModule.forFeature([{ name: 'reviews', schema: ShopSchema }]), 
            MongooseModule.forRoot('mongodb+srv://keystore:NsQHM43ExvP7BM3R@cluster0.elzyrqf.mongodb.net/Shop_DB')],
})
export class ShopModule {}