import { Body, Controller, Post, Get, Delete, Header, Param , UseGuards, Req, Res, HttpStatus, Put, Patch} from "@nestjs/common";
import { sign } from "crypto";
import { get } from "mongoose";
import { response } from "express";
import { request } from "http";
import { ReviewService } from "./review.service";

@Controller('reviews')

export class ReviewController{

    constructor(private reviewService: ReviewService) {}

    @Post('create')

        async createReview(@Body() {gameid, userEmail, rating, comment}: 
            {   gameid: string, 
                userEmail: string, 
                rating:number, 
                comment: string} , 
                @Res() res
            ) 
            {
                try {
                const message = await this.reviewService.createReview(gameid, userEmail, rating, comment);
                return res.status(HttpStatus.CREATED).json(message);
                } catch (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "User or GameId not found"});
                }
            }

    @Get(':gameid')

        async getReviews(@Param('gameid') gameid: string, @Res() res) {
        try {
            const reviews = await this.reviewService.getReviewsByGameId(gameid);
            return res.status(HttpStatus.OK).json(reviews);
        
        } catch (error) {
        
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error, message: "Internal Server Error" });
        }
        }

    @Put('edit/:id')

        async editReview(@Param('id') id: string, @Body() body , @Res() res) {
            try {
            
            const { rating, comment } = body;
            const message = await this.reviewService.editReview(id, {rating, comment});

            return res.status(HttpStatus.OK).json({ message });
            } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
            }
        }

    @Delete('delete/:reviewId')

        async deleteReview(@Param('reviewId') reviewId: string, @Res() res) {
          try {
            const message = await this.reviewService.deleteReview(reviewId);
            return res.status(HttpStatus.OK).json({ message });
          } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
          }
        }

}