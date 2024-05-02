import { Injectable } from '@nestjs/common';
import { shops } from './shop.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShopModel } from './shop.model';
import axios from "axios";
import * as crypto from "crypto";
import { games } from 'src/product/product.schema';
import { GameService } from 'src/product/product.service';

@Injectable()

export class ShopService {

    private defaultSecret = 'JSJDAAMFKJAUFMCKOPOAKCIKJOA@%&$JNASJNDsdaasfasfc$%$@';
    
    constructor(@InjectModel(shops.name) private shopModel: Model<shops>) {}

    async addPurchase(gameId: string, userId: string, token: string): Promise<string> {

      if (!gameId || !userId) {

        return ('Invalid game or user ID');
    
      }

      const userRes = await axios.get(`http://localhost:3333/users/getUser/${userId}`, {

        headers: {

          Authorization: `Bearer ${token}`,
  
        },
      });
  
      const user = userRes.data;
  
      if (!user) {
  
        throw new Error('User not found!');
  
      }

      const gameRes = await axios.get(`http://localhost:3334/games/${gameId}`);  
  
      const game = gameRes.data;
  
      if (!game) {
  
        throw new Error('Game not found');
  
      }

      const { specs, name, price, stock } = game;
  
      if (game.stock <= 0) {
  
        throw new Error('Game with no Stock Available');
  
      }
  
      await axios.put(`http://localhost:3334/games/reduceStock/${gameId}`);
  
      const gameKey = crypto
  
        .randomBytes(8)
        .toString('hex')
        .match(/.{1,4}/g)
        .join('-')
        .toUpperCase();
  
      const currentDate = new Date();
  
      const shop = new this.shopModel({
  
        gameId: gameId,
        userId: userId,
        saleDate: currentDate,
        amount: game.price
      });
  
      await shop.save();
  
      const { _id } = shop.toObject();
  
      const newUserGame = { userId: userId, gameId: gameId, name: game.name, key: gameKey, saleId: _id };
  
      await axios.post('http://localhost:3333/users/addGame', newUserGame);
  
      return 'Success';
  
    }
    
      async getSales(): Promise<shops[]> {
    
        const sales = await this.shopModel.find();
    
        if (!sales) {
    
          throw new Error('No Results');
    
        }
        return sales;
      }

      async getSale(saleId: string): Promise<shops> {

        const sale = await this.shopModel.findById(saleId);
    
        if (!sale) {
          throw new Error('Sale not found');
        }
        return sale;

      }
  
  }
