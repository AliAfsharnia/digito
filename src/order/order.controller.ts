import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { PlaceOrderDTO } from './DTO/placeOrder.DTO';
import { OrderEntity } from './order.entity';
import { User } from 'src/user/decorators/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { OrderService } from './order.service';
import { OrderProductEntity } from './orderProduct.entity';
import { AdminAuthGuard } from 'src/auth/Guards/auth.admin.guard';

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
    @Patch('order/close')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async closeOrder(@User() user: UserEntity): Promise<OrderEntity>{
        return await this.orderService.closeOrder(user);
    }

    @ApiTags("orders")
    @Get('user/orders')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async myOrders(@User() user: UserEntity): Promise<OrderEntity[]>{
        return await this.orderService.myOrders(user);
    }

    @ApiTags("orders")
    @Patch("order/:id/complete")
    @ApiBearerAuth()
    @UseGuards(AdminAuthGuard)
    async completeOrder(@Param('id') orderId: number): Promise<OrderEntity>{
        return await this.orderService.completeOrder(orderId);
    }

    @ApiTags("orders")
    @Get('order/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async orderedProducts(@User() user: UserEntity, @Param('id') orderId: number): Promise<OrderProductEntity[]>{
        return await this.orderService.orderedProducts(user, orderId);
    }

    @ApiTags("orders")
    @Get('order/:id/admin')
    @ApiBearerAuth()
    @UseGuards(AdminAuthGuard)
    async orderedProductsAdmin( @Param('id') orderId: number): Promise<OrderProductEntity[]>{
        return await this.orderService.orderedProductsAdmin(orderId);
    }

    @ApiTags("orders")
    @Get('orders/all')
    @ApiBearerAuth()
    @UseGuards(AdminAuthGuard)
    async getAll(): Promise<OrderEntity[]>{
        return await this.orderService.getAll();
    }

    @ApiTags("orders")
    @Delete('order/:orderid/:itemid')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async removeFromOrder(@User() user: UserEntity, @Param('orderid') orderId: number, @Param('itemid') itemId: number): Promise<OrderEntity>{
        return await this.orderService.removeFromOrder(user, orderId, itemId); 
    }
}
