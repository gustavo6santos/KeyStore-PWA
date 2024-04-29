import * as mongoose from 'mongoose';

export interface GamesModel extends Document {
  
        title: string,
        price: number,
        genre: string,
        stock: number,
        specs: {
                cpuModel: string,
                gpuModel: string,
                ram: number,
                 osType: string
        }
        
}