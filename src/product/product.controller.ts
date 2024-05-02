import { Body, Controller, Post, Get, Delete, Header, Param , UseGuards, Req, Res, HttpStatus, Put, Patch} from "@nestjs/common";
import { sign } from "crypto";
import { get } from "mongoose";
import { Response } from "express";
import { request } from "http";
import { GameService } from "./product.service";
import { GamesSchema, games, specs } from "./product.schema";
import { GamesModel } from "./product.model";



@Controller('games')

export class GameController{

    constructor(private gameService: GameService) {}

    @Post('create')

        async CreateGame(
          @Body() { title, price, genre, stock, specs }: { 
            title: string,
            price: number,
            genre: string,
            stock: number,
            ram: number,
            specs: specs }
        ): Promise<string> {
          try {
            const result = await this.gameService.createGame(
                title, 
                price, 
                genre, 
                stock,
                specs);
            return result;
          } catch (error) {
            throw new Error(error.message);
          }
        }
        
        @Get(':id')
        async getGame(@Param('id') id: string, @Res() res) {
          try {
            console.log(id);
            const game = await this.gameService.getGameById(id);
            if (!game) {
              return res.status(HttpStatus.NOT_FOUND).json({ message: "Game not found" });
            }
            return res.status(HttpStatus.OK).json(game);
          } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
          }
        }

        @Get()
        async getGames(@Res() res) {
          try {
            const games = await this.gameService.getGames();

            if (!games || games.length === 0) {
              return res.status(HttpStatus.NOT_FOUND).json({ message: "No Results" });
            }

            return res.status(HttpStatus.OK).json(games);

          } catch (error) {

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
          }
        }


        @Put('edit/:id')

        async editGame(@Param('id') id: string, @Body() body, @Res() res) {
          try {

            const { title, price, genre, specs, stock } = body;
            const updatedGame = await this.gameService.editGame(id, { title, price, genre, stock, specs });

          if (!updatedGame) {

             return res.status(HttpStatus.NOT_FOUND).json({ message: "Game not found" });
          }
                return res.status(HttpStatus.OK).json({ msg: "Game updated with success!" ,  updatedGame});

          }catch (error) {

                  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
          }
        }

        @Delete('delete/:id')

        async deleteGame(@Param('id') id: string, @Res() res) {

        try {
        const deletedGame = await this.gameService.deleteGame(id);

        if (!deletedGame) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: "Game not found" });
        }
          return res.status(HttpStatus.OK).json({ message: "Game deleted successfully" });
    
          } catch (error) {
      
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
          }
        }


        @Get('verify/:id')

        async verifyGameById(@Param('id') id: string, @Res() res) {

          try {
            const success = await this.gameService.verifyGameById(id);
            if (!success) {

              return res.status(HttpStatus.NOT_FOUND).json({ success: 0 });
            }
            
            return res.status(HttpStatus.OK).json({ success: 1 });
          } catch (error) {
            
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error, message: "Internal Server Error" });
          }
        }


        @Put('reduceStock/:id')
        
        async reduceStock(@Param('id') id: string, @Res() res: Response): Promise<Response>  {

        try {
        const message = await this.gameService.reduceStock(id);
        if (!message) {
        
          return res.status(HttpStatus.NOT_FOUND).json({ message: "Game not found" });
        }
      
        return res.status(HttpStatus.OK).json({ message });
        } catch (error) {
        
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error reducing stock" });
          }
        }

}