import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { UserEntity } from 'src/user/user.entity';
import { PlaceOrderDTO } from './DTO/placeOrder.DTO';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductEntity } from './orderProduct.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/product/product.entity';

@Injectable()
export class OrderService {
    constructor(@InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderProductEntity) private readonly orderProductRepository: Repository<OrderProductEntity>,
    @InjectRepository(ProductEntity) private readonly ProductRepository: Repository<ProductEntity>){}
    async placeOrder(user: UserEntity, placeOrderDto:PlaceOrderDTO):Promise<OrderProductEntity>{
             var pendingOrder = await this.orderRepository.findOne({ where: {user: user, status: "pending"}})

             if(!pendingOrder){
                pendingOrder = await this.orderRepository.create();
                pendingOrder.user = user;
                pendingOrder.totalPrice = 0;
                pendingOrder = await this.orderRepository.save(pendingOrder)
             }
             const product = await this.ProductRepository.findOne({where: {productId: placeOrderDto.productProductId}})

             if(!product){
                throw new HttpException('this product doesnt exist!',HttpStatus.UNPROCESSABLE_ENTITY)
             }

             if(product.stockCount < placeOrderDto.quantity){
                throw new HttpException('this product quantity is less then request!',HttpStatus.UNPROCESSABLE_ENTITY)
             }
             
             product.stockCount = product.stockCount - placeOrderDto.quantity;
             console.log('after adding', pendingOrder.totalPrice);
             pendingOrder.totalPrice = Number(pendingOrder.totalPrice) + (Number(product.price) * Number(placeOrderDto.quantity))
             console.log('before adding: ', pendingOrder.totalPrice);
             const newOrder = await this.orderProductRepository.create();
             newOrder.product = await this.ProductRepository.save(product);
             newOrder.order = await this.orderRepository.save(pendingOrder);
             newOrder.quantity = placeOrderDto.quantity;

             return await this.orderProductRepository.save(newOrder);
    }
}
