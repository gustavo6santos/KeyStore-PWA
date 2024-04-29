import { Injectable, NestMiddleware, HttpServer } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { reviews } from "./review.schema";
import axios from "axios";



@Injectable()

export class ReviewService{

    private defaultSecret = 'JSJDAAMFKJAUFMCKOPOAKCIKJOA@%&$JNASJNDsdaasfasfc$%$@';
    
    constructor(@InjectModel(reviews.name) private reviewModel: Model<reviews>) {}

    async createReview(gameid:string, userEmail:string, rating: number, comment: string): Promise<string> {
        try {
          // Check if the user with the provided email exists
          const userResponse = await axios.get(`http://localhost:3333/users/verify/${userEmail}`);

          const { success } = userResponse.data;
          if (success !== 1) {
            return "User not found";
          }
          
          // Check if the game exists
          const gameResponse = await axios.get(`http://localhost:3334/games/verify/${gameid}`);
          
          if (gameResponse.data.success !== 1) {
            return "Game not found";
          }
    
          // Create the review
          const review = new this.reviewModel({
            gameid,
            userEmail,
            rating,
            comment
          });

          await review.save();
          return "Review created successfully";
        } catch (error) {
          throw new Error("Internal server error");
        }
  }

        async getReviewsByGameId(gameid: string): Promise<any> {
            try {
            // Verify if the game exists
            const gameResponse = await axios.get(`http://localhost:3334/games/verify/${gameid}`);
            const { success } = gameResponse.data;
            
            if (success !== 1) {
                throw new Error("Game not found");
            }

            // Get reviews for the game
            const reviews = await this.reviewModel.find({ gameid });
            
            if (!reviews || reviews.length === 0) {
                throw new Error("No reviews available for this game");
            }
            return reviews;
            
        } catch (error) {
            throw new Error("Internal server error");
        }        
    }

    async editReview(id: string, data: Partial<reviews>): Promise<reviews> {
        try {
          const updatedReview = await this.reviewModel.findByIdAndUpdate(id, data, { new: true});
          await updatedReview.save();
          return updatedReview;

        } catch (error) {
          throw new Error("Internal server error");
        }
      }

      async deleteReview(reviewId: string): Promise<string> {
        try {
          const deletedReview = await this.reviewModel.findByIdAndDelete(reviewId);
          if (!deletedReview) {
            return "Review not found";
          }
          return "Review deleted successfully";
        } catch (error) {
          throw new Error("Internal server error");
        }
      }
}