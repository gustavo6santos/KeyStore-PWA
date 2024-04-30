import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema ({timestamps: true})

export class shops  {

    @Prop()
    gameid: string;

    @Prop()
    userId: string;

    @Prop()
    date: Date;

    @Prop()
    game_key: string;
}

export const ShopSchema = SchemaFactory.createForClass(shops)