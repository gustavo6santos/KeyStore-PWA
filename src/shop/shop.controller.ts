import { Controller } from '@nestjs/common';
import { ShopService } from './shop.service';
import { Post, Body, Res, HttpStatus, Headers } from '@nestjs/common';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('shops')

export class ShopController {

    constructor(private shopService: ShopService) {}

    @Post('add')

        async addPurchase(@Body() purchaseData: any, req: Request , @Res() res) {

            const { gameid, userId } = purchaseData;
            const token = req.headers.authorization?.split(" ")[1];

            try {
            const message = await this.shopService.addPurchase(gameid, userId, token);
            return res.status(HttpStatus.CREATED).send(message);
            } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: "Internal server error" });
            }
        }
}
