import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./auth.schema";

@Module({
    controllers: [AuthController],
    providers:[AuthService],
    imports:[MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]), 
            MongooseModule.forRoot('mongodb+srv://keystore:NsQHM43ExvP7BM3R@cluster0.elzyrqf.mongodb.net/User_DB')]
})

export class AuthModule {}