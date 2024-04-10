import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Auth } from "./auth.module";


@Injectable()

export class AuthService{
    
    constructor(@InjectModel('Auth') private readonly authModel: Model<Auth>) {}

    Login() {
        return { msg:'I am Logged.'}
    }

    Register() {
        return { msg: 'I am registered.'}
    }

    async InsertUser (username:string, email:string, password: string, order_id: string) {
        const newUser = new this.authModel({
            username,
            email,
            password,
            order_id
        });

       const result = await newUser.save();
       console.log(result);
       return result;

    }
}