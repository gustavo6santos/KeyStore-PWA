import { Body, Controller, Post, Get, Delete, Header, Param , UseGuards, Req, Res, HttpStatus, Put, Patch} from "@nestjs/common";
import { sign } from "crypto";
import { get } from "mongoose";
import { response } from "express";
import { request } from "http";
import { ShopService } from "./shop.service";


@Controller('shops')

export class ShopController{

    constructor(private shopService: ShopService) {}

}