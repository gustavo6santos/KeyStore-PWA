import { Controller } from '@nestjs/common';
import { ShopService } from './shop.service';
import { Post, Body, Res, HttpStatus } from '@nestjs/common';

@Controller('shops')

export class ShopController {

    constructor(private shopService: ShopService) {}

    @Post('add')

        async addPurchase(@Body() purchaseData: any, @Res() res) {

            const { gameid, userEmail, token } = purchaseData;

            try {
            const message = await this.shopService.addPurchase(gameid, userEmail, token);
            return res.status(HttpStatus.CREATED).json(message);
            } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
            }
        }
}
