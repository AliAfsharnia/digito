import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { PlaceOrderDTO } from './DTO/placeOrder.DTO';
import { OrderEntity } from './order.entity';
import { User } from 'src/user/decoratores/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { OrderService } from './order.service';
import { OrderProductEntity } from './orderProduct.entity';

@ApiTags("order")
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService){}

    @Put()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiBody({
        type: PlaceOrderDTO,
        description: "Body for updating User",
        isArray: true
    })
    async placeOrder(@User() user: UserEntity, @Body() placeOrderDto: PlaceOrderDTO[]): Promise<OrderProductEntity[]>{
        const orders = await Promise.all(placeOrderDto.map( placeOrderDto => this.orderService.placeOrder(user, placeOrderDto)))
        return orders
    }

}
