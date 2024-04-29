import * as mongoose from 'mongoose';

export interface ShopModel extends Document {
  
        gameid: string,
        userId: string,
        amount: number,
        saleDate: string
        
}