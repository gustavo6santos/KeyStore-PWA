import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";




@Schema ({timestamps: true})

export class user  {

    @Prop()
    username: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    order_id: string;

    @Prop([{
        gameId: String,
        name: String,
        key: String,
        saleId: String
      }])
      games: {
        gameId: string;
        name: string;
        key: string;
        saleId: string;
      }[];

      @Prop([{
        ram: Number,
        cpuModel: String,
        gpuModel: String,
        osType: String
      }])
      specs: {
        ram: number;
        cpuModel: string;
        gpuModel: string;
        osType: string;
      }[];
}

export const UserSchema = SchemaFactory.createForClass(user)