import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MiddlewareConsumer } from "@nestjs/common";
import { RequestMethod } from "@nestjs/common";
import { GameController } from "./product.controller";
import { GamesModel } from "./product.model";
import { GamesSchema } from "./product.schema";
import { GameService } from "./product.service";


@Module({
    controllers: [GameController],
    providers:[GameService],
    imports:[MongooseModule.forFeature([{ name: 'games', schema: GamesSchema }]), 
            MongooseModule.forRoot('mongodb+srv://keystore:NsQHM43ExvP7BM3R@cluster0.elzyrqf.mongodb.net/Product_DB')],
})

export class GamesModule {

}