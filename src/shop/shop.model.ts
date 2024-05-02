import * as mongoose from 'mongoose';

export interface ShopModel extends Document {
  
        gameId: string,
        userId: string,
        saleDate: Date,
        amount: string
        
}