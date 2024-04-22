import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema ({timestamps: true})

export class user extends Document {

    @Prop()
    username: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    order_id: string;
}

export const AuthSchema = SchemaFactory.createForClass(user)