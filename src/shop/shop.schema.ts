import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema ({timestamps: true})

export class shops  {

    @Prop()
    gameId: string;

    @Prop()
    userId: string;

    @Prop()
    saleDate: Date;

    @Prop()
    amount: string;
}

export const ShopSchema = SchemaFactory.createForClass(shops)