import * as mongoose from 'mongoose';

export interface GamesModel extends Document {
  
        title: string,
        price: number,
        genre: string,
        stock: number,
        ram: number,
        cpuModel: string,
        gpuModel: string,
        osType: string
}