import * as mongoose from 'mongoose';

export interface AuthModel extends Document {
  
        username: string,
        email: string,
        password: string,
        order_id: string,
}

