import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { UserSchema } from '../auth.schema';
import { user } from '../auth.schema';
import { AuthModel } from '../auth.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

    

declare global {
    namespace Express {

      interface Request {
        userSchema?: user;
      }
    }
  }

@Injectable()


export class AuthMiddleware implements NestMiddleware {

    private defaultSecret = 'JSJDAAMFKJAUFMCKOPOAKCIKJOA@%&$JNASJNDsdaasfasfc$%$@';

    async use(req: Request, res: Response, next: NextFunction) {

        
        try {
            
          const token = req.headers.authorization?.split(" ")[1];
          if (!token) {
            // If token is missing, return 401 response
            return res.status(401).send({ message: "Invalid or missing token" });
          }
          const decoded = jwt.verify(token, this.defaultSecret) as any;
          console.log('Decoded Token:', decoded);
          // Now you can use the decoded token information as needed
          req.userSchema = decoded;
          next();
        } catch (error) {
          // If token is invalid, return 401 response
          return res.status(401).send({ message: "Invalid or missing token" });
        }
      }
}