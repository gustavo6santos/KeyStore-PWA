import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthModel } from "./auth.model";

@Controller()

export class AuthController{
    constructor(private authService: AuthService) {}

   @Post('Login')
        Login(@Body () userDto: AuthModel) {
           return this.authService.Login(userDto.username, userDto.password)
        }
      
    @Post('Register')
        Register() {
           return  this.authService.Register()
        }

        @Post('insert_user')

        InsertUser(@Body() userDto: AuthModel ) {
          return this.authService.InsertUser(userDto.username, userDto.password, userDto.email, userDto.order_id);
        }
}