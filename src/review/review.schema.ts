import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema ({timestamps: true})

export class reviews  {

    @Prop()
    gameid: string;

    @Prop()
    userEmail: string;

    @Prop()
    rating: number;

    @Prop()
    comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(reviews)