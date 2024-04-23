import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthModel } from "./auth.model";
import { sign } from "crypto";


@Controller()

export class AuthController{
    constructor(private authService: AuthService) {}

    @Post('Login')

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
            
           




        @Post('insert_user')

        InsertUser(@Body() userDto: AuthModel ) {
          return this.authService.InsertUser(userDto.username, userDto.password, userDto.email, userDto.order_id);
        }
}