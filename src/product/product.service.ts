import { Injectable, NestMiddleware } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { GameController } from "./product.controller";
import { GamesModel } from "./product.model";
import { GamesModule } from "./product.module";
import { games } from "./product.schema";


@Injectable()

export class GameService{

    constructor(@InjectModel(games.name) private gameModel: Model<games>) {}

    async  createGame (title: string, price: number, genre:string, stock: number, 
        ram: number, cpuModel:string, gpuModel: string, osType:string) {

            if (!title) {
                return 'Title is mandatory!';
            }

            if(!price) {
                return 'Price is mandatory!';
            }

            if(!genre) {
                return 'Genre is mandatory!';
            }

            if(!stock) {
                stock = 0;
            }

            if(!cpuModel) {
                return 'CPU Model is mandatory!';
            }

            if(!gpuModel) {
                return 'GPU Model is mandatory!';
            }

            if(!osType) {
                return 'Os Type is mandatory!';
            }

            const gameExist = await this.gameModel.findOne({title: title});

            if(gameExist) {
                return 'The game ' + title + 'already exist';
            }

            const game = new this.gameModel({
                title,
                price,
                genre,
                stock,
                cpuModel,
                gpuModel,
                osType
            });

            try {
                await game.save();
                return 'Game was created with success!'
            } catch (error) {
                throw new Error ('Internal server error'); 
            }
    }
}