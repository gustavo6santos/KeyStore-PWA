import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./auth.schema";
import { MiddlewareConsumer } from "@nestjs/common";
import { RequestMethod } from "@nestjs/common";
import { AuthMiddleware } from "./middlewares/auth.middleware";

@Module({
    controllers: [AuthController],
    providers:[AuthService, AuthMiddleware],
    imports:[MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]), 
            MongooseModule.forRoot('mongodb+srv://keystore:NsQHM43ExvP7BM3R@cluster0.elzyrqf.mongodb.net/User_DB')],
})
export class AuthModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(AuthMiddleware)
          .forRoutes({ path: 'users/getUser/:id', method: RequestMethod.GET }); // Adjust the route path and HTTP method accordingly
    }
}