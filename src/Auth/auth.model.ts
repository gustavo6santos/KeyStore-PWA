import * as mongoose from 'mongoose';

export const  AuthSchema = new mongoose.Schema({
        
         username: String,
         email: String,
         password: String,
         order_id: String,

});

export interface Auth {
  
        username: string,
        email: string,
        password: string,
        order_id: string,
}