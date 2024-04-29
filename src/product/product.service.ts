import { Injectable, NestMiddleware } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { GameController } from "./product.controller";
import { GamesModel } from "./product.model";
import { GamesModule } from "./product.module";
import { games, specs } from "./product.schema";


@Injectable()

export class GameService{

    constructor(@InjectModel(games.name) private gameModel: Model<games>) {}

    async  createGame (title: string, price: number, genre:string, stock: number, specs: specs) {

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

            if(!specs) {
                return 'Specs is mandatory!';
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
                specs
            });

            try {
                await game.save();
                return 'Game was created with success!'
            } catch (error) {
                throw new Error ('Internal server error'); 
            }
    }

    async getGameById(id: string): Promise<any> {
        try {
          const game = await this.gameModel.findById(id);
          if (!game) {
            return null;
          }
          const newGame  = game.toObject();
          return newGame;
        } catch (error) {
          throw new Error(error.message);
        }
      }

      async getGames(): Promise<any[]> {
        try {
          const games = await this.gameModel.find();
          return games;
        } catch (error) {
          throw new Error(error.message);
        }
      }


      async editGame(id: string, data: Partial<games>): Promise<games> {
        try {
          const updatedGame = await this.gameModel.findByIdAndUpdate(id, data, { new: true });
          updatedGame.save();
          return updatedGame;
        } catch (error) {
          throw new Error(error.message);
        }
      }

      async deleteGame(id: string): Promise<games> {
        try {
          const deletedGame = await this.gameModel.findByIdAndDelete(id);
          return deletedGame;
        } catch (error) {
          throw new Error(error.message);
        }
      }

      async verifyGameById(id: string): Promise<boolean> {
        try {
          const game = await this.gameModel.findById(id);
          return !!game; // Returns true if game exists, false otherwise
        } catch (error) {
          throw new Error("Internal server error");
        }
      }
      
      async reduceStock(id: string): Promise<string> {
        try {
          const game = await this.gameModel.findById(id);
          if (!game) {
            return null;
          }
          game.stock--;
          await game.save();
          return "Stock reduced with success!";
        } catch (error) {
          throw new Error("Error reducing stock");
        }
      }

      
}


