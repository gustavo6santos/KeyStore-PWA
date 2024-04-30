import * as mongoose from 'mongoose';

export interface AuthModel extends Document {
  
        username: string,
        email: string,
        password: string,
        order_id: string,
        specs: {
                cpuModel: string,
                gpuModel: string,
                ram: number,
                 osType: string
        },
        games: {
                gameid: string,
                name: string,
                key: string,
                saleId: string
        }
}

