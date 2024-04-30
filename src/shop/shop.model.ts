import * as mongoose from 'mongoose';

export interface ShopModel extends Document {
  
        gameid: string,
        userId: string,
        date: Date,
        game_key: string
        
}