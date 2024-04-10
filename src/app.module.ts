import { Module } from '@nestjs/common';
import { Auth } from './Auth/auth.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ShopModule } from './shop/shop.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    Auth, 
    ProductModule, 
    ReviewModule, 
    ShopModule,
    MongooseModule.forRoot('mongodb+srv://keystore:NsQHM43ExvP7BM3R@cluster0.elzyrqf.mongodb.net/')
    ]
  
})
export class AppModule {}
