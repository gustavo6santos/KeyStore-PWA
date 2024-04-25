import { Body, Controller, Post, Get, Delete, Header, Param , UseGuards, Req, Res, HttpStatus} from "@nestjs/common";
import { sign } from "crypto";
import { get } from "mongoose";
import { response } from "express";
import { request } from "http";
import { GameService } from "./product.service";
import { GamesSchema, games } from "./product.schema";
import { GamesModel } from "./product.model";



@Controller('games')

export class GameController{

    constructor(private gameService: GameService) {}

    @Post('create')

        async CreateGame(
          @Body() { title, price, genre, stock, ram, cpuModel, gpuModel, osType }: { title: string,
            price: number,
            genre: string,
            stock: number,
            ram: number,
            cpuModel: string,
            gpuModel: string,
            osType: string }
        ): Promise<string> {
          try {
            const result = await this.gameService.createGame(
                title, 
                price, 
                genre, 
                stock, 
                ram, 
                cpuModel, 
                gpuModel, 
                osType);
            return result;
          } catch (error) {
            throw new Error(error.message);
          }
        }
    }