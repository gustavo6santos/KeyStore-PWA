import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema ({timestamps: true})

@Schema()
export class specs {
  @Prop({ required: true })
  ram: number;

  @Prop({ required: true })
  cpuModel: string;

  @Prop({ required: true })
  gpuModel: string;

  @Prop({ required: true })
  osType: string;
}

@Schema()
export class games {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ type: specs, required: true })
  specs: specs;
}


export const GamesSchema = SchemaFactory.createForClass(games)