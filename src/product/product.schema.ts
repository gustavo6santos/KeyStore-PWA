import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema ({timestamps: true})

export class games  {

    @Prop()
    title: string;

    @Prop()
    price: number;

    @Prop()
    genre: string;

    @Prop()
    stock: number;

    @Prop()
    ram: number;

    @Prop()
    cpuModel: string;

    @Prop()
    gpuModel: string;

    @Prop()
    osType: string;


}

export const GamesSchema = SchemaFactory.createForClass(games)