import * as mongoose from 'mongoose';

export interface ReviewModel extends Document {
  
        gameid: string,
        userEmail: string,
        rating: number,
        comment: string
        
}
