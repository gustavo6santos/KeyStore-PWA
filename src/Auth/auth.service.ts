import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthModule } from "./auth.module";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { user } from "./auth.schema";



@Injectable()

export class AuthService{

    private defaultSecret = 'JSJDAAMFKJAUFMCKOPOAKCIKJOA@%&$JNASJNDsdaasfasfc$%$@';
    
    constructor(@InjectModel(user.name) private userModel: Model<user>) {}

    async Login(email: string, password: string) {

     
        // Validations

        if (!email) {
          throw new Error('Email is mandatory!');
        }
    
    
        if (!password) {
          throw new Error('Password is mandatory!');
        }
    
        // Check if user exists
        const user = await this.userModel.findOne({email});
    
        if (!user) {
    
          throw new Error('Invalid email!');
    
        }
    
        // Check if password match
    
        const checkPassword = await bcrypt.compare(password, user.password);
    
        if (!checkPassword) {
          throw new Error('Invalid password!');
        }
    
        // Generate JWT token
        const secret = process.env.SECRET || this.defaultSecret;;
    
        const token = jwt.sign(
    
          {
            id: user._id,
          },
    
          secret,
    
          { expiresIn: '5m' }
    
        );
    
        return { msg: 'Authentication completed successfully!', token };
      }

      async Register(username: string, email: string, password: string, confirmPassword: string): Promise<string> {
        // Validations
        if (!username || !email || !password || !confirmPassword) {
          throw new Error("All fields are mandatory!");
        }
    
        if (password !== confirmPassword) {
          throw new Error("Passwords don't match!");
        }
    
        if (password.length < 8) {
          throw new Error("Password is too short!");
        }
    
        if (!/[A-Z]/.test(password)) {
          throw new Error("Password must have an uppercase character!");
        }
    
        if (!/[0-9]/.test(password)) {
          throw new Error("Password must have a number!");
        }
    
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
          throw new Error("Password must have a special character!");
        }
    
        if (!/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {
          throw new Error("Invalid Email!");
        }
    
        // Check if user exists
        const userExist = await this.userModel.findOne({ email: email });
    
        if (userExist) {
          throw new Error("Email already in use. Please use another email!");
        }
    
        // Create password hash
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
    
        // Create user
        const user = new this.userModel({
          username,
          email,
          password: passwordHash,
        });
    
        await user.save();
    
        return "User created with success!";
      }
    
  
    


    async InsertUser (username:string, email:string, password: string, order_id: string) {
        const newUser = new this.userModel({
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