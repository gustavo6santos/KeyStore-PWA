import { Injectable } from '@nestjs/common';
import { shops } from './shop.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShopModel } from './shop.model';
import axios from "axios";
import * as crypto from "crypto";

@Injectable()

export class ShopService {

    private defaultSecret = 'JSJDAAMFKJAUFMCKOPOAKCIKJOA@%&$JNASJNDsdaasfasfc$%$@';
    
    constructor(@InjectModel(shops.name) private shopModel: Model<shops>) {}

    async addPurchase(gameId: string, userId: string, token: string): Promise<any> {
        try {
          // Define the request headers
          const headers = {
            Authorization: `Bearer ${token}`,
          };
    
          // Fetch user information
          const userRes = await axios.get(`http://localhost:3333/users/getUser/${userId}`, { headers });
          const user = userRes.data;
    
          if (!user) {
            throw new Error('User not found!');
          }
    
          // Fetch game information
          const gameRes = await axios.get(`http://localhost:3334/games/${gameId}`);
          const game = gameRes.data;
    
          if (!game) {
            throw new Error('Game not found');
          }
    
          const { specs, name, price, stock } = game;
    
          if (stock <= 0) {
            throw new Error('Game with no Stock Available');
          }
    
          // Reduce stock
          await axios.put(`http://localhost:3334/games/reduceStock/${gameId}`);
    
          // Generate a random game key
          const gameKey = crypto
            .randomBytes(8)
            .toString('hex')
            .match(/.{1,4}/g)
            .join('-')
            .toUpperCase();
    
          const currentDate = new Date();
    
          // Create a new sale
          const shop = new this.shopModel({
            gameId: gameId,
            userId: userId,
            amount: price,
            saleDate: currentDate,
          });
    
          // Save the sale
          const savedSale = await shop.save();
    
          // Get the ID of the saved sale
          const { _id } = savedSale;
    
          // Prepare data for adding game to user
          const newUserGame = { userId: userId, gameId: gameId, name: name, key: gameKey, saleId: _id };
    
          // Add game to user
          await axios.put('http://localhost:3004/http-auth/user/addGame', newUserGame);
    
          return { message: 'Success' };
        } catch (error) {
          throw new Error(`Failed to add sale: ${error.message}`);
        }
      }
}
