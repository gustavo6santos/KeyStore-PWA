import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewSchema } from './review.schema';
import { MongooseModule } from "@nestjs/mongoose";
import { ReviewService } from './review.service';

@Module({
    controllers: [ReviewController],
    providers:[ReviewService],
    imports:[MongooseModule.forFeature([{ name: 'reviews', schema: ReviewSchema }]), 
            MongooseModule.forRoot('mongodb+srv://keystore:NsQHM43ExvP7BM3R@cluster0.elzyrqf.mongodb.net/Review_DB')],
})
export class ReviewModule {}
