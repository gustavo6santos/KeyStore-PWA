import { Injectable, NestMiddleware, HttpServer } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import axios from "axios";
import { shops } from "./shop.schema";



@Injectable()

export class ShopService{

    private defaultSecret = 'JSJDAAMFKJAUFMCKOPOAKCIKJOA@%&$JNASJNDsdaasfasfc$%$@';
    
    constructor(@InjectModel(shops.name) private shopModel: Model<shops>) {}

}