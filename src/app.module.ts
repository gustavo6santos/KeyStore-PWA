import { Module } from '@nestjs/common';
import { AuthModule } from './Auth/auth.module';
import { GamesModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ShopModule } from './shop/shop.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GamesSchema } from './product/product.schema';
import { UserSchema } from './Auth/auth.schema';
import { GameController } from './product/product.controller';


@Module({
  imports: [
    AuthModule, 
    GamesModule, 
    ReviewModule, 
    ShopModule,
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]), 
    MongooseModule.forRoot('mongodb+srv://keystore:NsQHM43ExvP7BM3R@cluster0.elzyrqf.mongodb.net/User_DB')
    ]
  
})
export class AppModule {}


@Module({

  imports: [

    MongooseModule.forFeature([{ name: 'games', schema: GamesSchema }]),

  ],

  controllers: [GameController],

})

export class GameModule {}