import { Body, Controller, Post, Get, Delete, Header, Param , UseGuards, Req, Res, HttpStatus} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthModel } from "./auth.model";
import { sign } from "crypto";
import { get } from "mongoose";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { response } from "express";
import { request } from "http";


@Controller('users')

export class AuthController{
    constructor(private authService: AuthService) {}

        @Post('login')

        async Login(@Body('email') email: string, @Body('password') password: string) {
          try {
            const result = await this.authService.Login(email, password);
            return result;

          } catch (error) {
            throw new Error(error.message);
          }
        }
            
        @Post('register')

        async Register(
          @Body() { username, email, password, confirmPassword }: { username: string, email: string, password: string, confirmPassword?: string }
        ): Promise<string> {
          try {
            const result = await this.authService.Register(username, email, password, confirmPassword);
            return result;
          } catch (error) {
            throw new Error(error.message);
          }
        }

  /*@Get('getUser/:id')
  async getUser(@Param('id') id: string) {

    const result = await this.authService.getUser(id);
    return result;
  }
*/

        @Get('getUser/:id')

        async getUser(@Param('id') id: string, @Req() req) {
          const decodedToken = req.userSchema;
          if (!decodedToken) {
            return { message: "Invalid or missing token" };
          }
          const result = await this.authService.getUser(id);
          return result;
        }
                  
      
        @Get()

        async getUsers() {
          try {
            const users = await this.authService.getUsers();
            return { users };
          } catch (error) {
            return { message: error.message };
          }
        }

        @Get('verify/:email')
        async verifyUserByEmail(@Param('email') email: string, @Res() res) {
         try {
             const userExists = await this.authService.verifyUserByEmail(email);
         if (userExists) {
             return res.status(HttpStatus.OK).send({ success: 1 });
       }  
         else {

             return res.status(HttpStatus.NOT_FOUND).send({ success: 0 });

          }
       }     catch (error) {
               return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
  }
           




        @Post('insert_user')

        InsertUser(@Body() userDto: AuthModel ) {
          return this.authService.InsertUser(userDto.username, userDto.password, userDto.email, userDto.order_id);
        }
}