import { Module } from '@nestjs/common';
import { AuthModule } from './Auth/auth.module';
import { GamesModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ShopModule } from './shop/shop.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GamesSchema } from './product/product.schema';
import { UserSchema } from './Auth/auth.schema';
import { GameController } from './product/product.controller';
import { ReviewSchema } from './review/review.schema';
import { ShopSchema } from './shop/shop.schema';


@Module({
  imports: [
    AuthModule, 
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]), 
    MongooseModule.forRoot('mongodb+srv://keystore:NsQHM43ExvP7BM3R@cluster0.elzyrqf.mongodb.net/User_DB')
    ]
  
})
export class AppModule {}


@Module({

  imports: [
    GamesModule,
    MongooseModule.forFeature([{ name: 'games', schema: GamesSchema }]),
    MongooseModule.forRoot('mongodb+srv://keystore:NsQHM43ExvP7BM3R@cluster0.elzyrqf.mongodb.net/Product_DB')

  ]

})

export class GameModule {}

@Module({

  imports: [
    ReviewModule,
    MongooseModule.forFeature([{ name: 'reviews', schema: ReviewSchema }]),
    MongooseModule.forRoot('mongodb+srv://keystore:NsQHM43ExvP7BM3R@cluster0.elzyrqf.mongodb.net/Review_DB')

  ]

})

export class ReviewAppModule {}


@Module({

  imports: [
    ShopModule,
    MongooseModule.forFeature([{ name: 'shops', schema: ShopSchema }]),
    MongooseModule.forRoot('mongodb+srv://keystore:NsQHM43ExvP7BM3R@cluster0.elzyrqf.mongodb.net/Shop_DB')

  ]

})

export class ShopAppModule {}