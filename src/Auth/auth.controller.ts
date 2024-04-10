import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Auth} from "./auth.model";

@Controller()

export class AuthController{
    constructor(private authService: AuthService) {}

    @Post('Login')
        Login() {
           return this.authService.Login()
        }

    @Post('Register')
        Register() {
           return  this.authService.Register()
        }

        @Post('insert_user')

        InsertUser(@Body() userDto: Auth ) {
          return this.authService.InsertUser(userDto.username, userDto.password, userDto.email, userDto.order_id);
        }
}