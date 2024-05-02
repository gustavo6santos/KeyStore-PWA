import { Controller } from '@nestjs/common';
import { ShopService } from './shop.service';
import { Post, Body, Res, Req, HttpStatus, Headers, Get, Param } from '@nestjs/common';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { shops } from './shop.schema';

@Controller('shops')

export class ShopController {

    constructor(private shopService: ShopService) {}

    @Post('addPurchase')

    async addSale(
  
      @Body('gameId') gameId: string,
  
      @Body('userId') userId: string,
  
      @Req() req,
  
      @Res() res,
  
    ): Promise<void> {
  
      try {
  
        const token = req.headers.authorization.split(' ')[1];
        const message = await this.shopService.addPurchase(gameId, userId, token);
  
        res.status(200).json({ message: message });

      } catch (error) {
  
        console.error('Error:', error);

        res.status(500).json({ message: 'Internal server error' });  
      }
    }

    @Get()

    async getShops(): Promise<shops[]> {

        return this.shopService.getSales();
    }

    @Get('/:id')

    async getShop(@Param('id') saleId: string, @Res() res): Promise<shops> {
  
        try {
            const shop = await this.shopService.getSale(saleId);
            return res.status(HttpStatus.OK).json(shop);
        
        } catch (error) {
        
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error, message: "Internal Server Error" });
        }
    }

}
