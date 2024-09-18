import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { PlaceOrderDTO } from './DTO/placeOrder.DTO';
import { OrderEntity } from './order.entity';
import { User } from 'src/user/decorators/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { OrderService } from './order.service';
import { OrderProductEntity } from './orderProduct.entity';
import { AdminAuthGuard } from 'src/auth/Guards/auth.admin.guard';
import { Status } from './type/enums';

@Controller()
export class OrderController {
    constructor(private readonly orderService: OrderService){}

    @ApiTags("orders")
    @Post('order')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiBody({
        type: PlaceOrderDTO,
        description: "Body for updating User",
        isArray: true
    })
    async placeOrder(@User() user: UserEntity, @Body() placeOrderDto: PlaceOrderDTO[]): Promise<OrderProductEntity[]>{
        let orders: OrderProductEntity[] = []
        for (const order of placeOrderDto) {
            orders.push(await this.orderService.placeOrder(user, order));
          }

        return orders
    }

    @ApiTags("orders")
    @Patch('order/status/:id')
    @ApiBearerAuth()
    @ApiQuery({ name: 'status', enum: Status })
    @UseGuards(AdminAuthGuard)
    async changeOrderStatus(@Query('status') status: string, @Param('id') id: number): Promise<OrderEntity>{
        return await this.orderService.changeOrderStatus(status, id);
    }

    @ApiTags("orders")
    @Get('order/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async orderedProducts(@User() user: UserEntity, @Param('id') id: number): Promise<OrderProductEntity[]>{
        return await this.orderService.orderedProducts(user, id);
    }

    @ApiTags("orders")
    @Get('order/:id/admin')
    @ApiBearerAuth()
    @UseGuards(AdminAuthGuard)
    async orderedProductsAdmin( @Param('id') id: number): Promise<OrderProductEntity[]>{
        return await this.orderService.orderedProductsAdmin(id);
    }

    @ApiTags("orders")
    @Get('orders/all')
    @ApiBearerAuth()
    @UseGuards(AdminAuthGuard)
    async getAll(): Promise<OrderEntity[]>{
        return await this.orderService.getAll();
    }

    @ApiTags("orders")
    @Delete('order/:id/:itemid')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async removeFromOrder(@User() user: UserEntity, @Param('id') id: number, @Param('itemid') itemId: number): Promise<OrderEntity>{
        return await this.orderService.removeFromOrder(user, id, itemId); 
    }
}
