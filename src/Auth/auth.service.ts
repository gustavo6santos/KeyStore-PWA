import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose"

import { Model } from "mongoose";
import { Auth } from "./auth.module";
import { AuthModel } from "./auth.model";
import { AuthSchema } from "./auth.schema";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


@Injectable()

export class AuthService{
    
    constructor(@InjectModel(Auth.name) private  authModel: Model<Auth>) {}

    async Login(LoginDt: LoginDt): Promise<{Token: string}> {

      
        // Validations

        if (!email) {
          throw new Error('Email is mandatory!');
        }
    
    
        if (!password) {
          throw new Error('Password is mandatory!');
        }
    
        // Check if user exists
        const user:Auth = await this.authModel.findOne({email});
    
        if (!user) {
    
          throw new Error('Invalid email!');
    
        }
    
        // Check if password match
    
        const checkPassword = await bcrypt.compare(password, user.password);
    
        if (!checkPassword) {
          throw new Error('Invalid password!');
        }
    
        // Generate JWT token
        const secret = process.env.SECRET;
    
        const token = jwt.sign(
    
          {
            id: user._id,
          },
    
          secret,
    
          { expiresIn: '5m' }
    
        );
    
        return { msg: 'Authentication completed successfully!', token };
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