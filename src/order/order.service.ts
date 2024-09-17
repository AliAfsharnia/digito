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
                pendingOrder = this.orderRepository.create();
                pendingOrder.user = user;
                pendingOrder.totalPrice = 0;
                pendingOrder = await this.orderRepository.save(pendingOrder)
                console.info("Order created Successfuly: ", pendingOrder.orderId)
             }
             const product = await this.ProductRepository.findOne({where: {productId: placeOrderDto.productProductId}})

             if(!product){
                throw new HttpException('this product doesnt exist!',HttpStatus.UNPROCESSABLE_ENTITY)
             }

             if(product.stockCount < placeOrderDto.quantity){
                throw new HttpException('this product quantity is less then request!',HttpStatus.UNPROCESSABLE_ENTITY)
             }
             
             product.stockCount = (product.stockCount - placeOrderDto.quantity);
             console.log('before adding', pendingOrder.totalPrice);
             pendingOrder.totalPrice = Number(pendingOrder.totalPrice) + (Number(product.price) * Number(placeOrderDto.quantity))
             console.log('after adding: ', pendingOrder.totalPrice);
             let newOrder = this.orderProductRepository.create();
             newOrder.product = await this.ProductRepository.save(product);
             newOrder.order = await this.orderRepository.save(pendingOrder);
             newOrder.quantity = placeOrderDto.quantity;
             newOrder = await this.orderProductRepository.save(newOrder);
             
            console.info("item added to order successfuly: ",newOrder.id )

             return newOrder
    }

    async myOrders(user: UserEntity): Promise<OrderEntity[]>{
        const order =  await this.orderRepository.find({where: {user: user}});

        return order;
    }

    async orderedProducts(user: UserEntity, orderId: number): Promise<OrderProductEntity[]>{
        const order = await this.orderRepository.findOne({where: {orderId: orderId}, relations: ['orderProducts', 'user']});

        if(!order){
            throw new HttpException('this order doesnot exist!',HttpStatus.UNPROCESSABLE_ENTITY)
        }

        if(order.user.userId != user.userId){
            throw new HttpException('not authorized', HttpStatus.UNAUTHORIZED)
        }

        const items = order.orderProducts;

        return items
    }

    async orderedProductsAdmin(orderId: number): Promise<OrderProductEntity[]>{
        const order = await this.orderRepository.findOne({where: {orderId: orderId}});

        if(!order){
            throw new HttpException('this order doesnot exist!',HttpStatus.UNPROCESSABLE_ENTITY)
        }

        return await this.orderProductRepository.find({where: {order: order}})
    }

    async closeOrder(user: UserEntity): Promise<OrderEntity>{
        const pendingOrder = await this.orderRepository.findOne({ where: {user: user, status: 'pending'}})

        if(!pendingOrder){
            throw new HttpException('you have no pending order',HttpStatus.UNPROCESSABLE_ENTITY)
        }

        pendingOrder.status = "in progress";
        const result = await this.orderRepository.save(pendingOrder);

        console.info("Status of order changed to (in progress) successfuly for user: ", user.userId)

        return result;
    }

    async completeOrder(orderId: number): Promise<OrderEntity>{
        const order = await this.orderRepository.findOne({where: {orderId: orderId}})

        if(!order){
            throw new HttpException('this order doesnot exist!',HttpStatus.UNPROCESSABLE_ENTITY)
        }

        if(order.status == 'pending' || order.status == 'complete'){
            throw new HttpException('order most be on (in progress) status for this request!',HttpStatus.UNPROCESSABLE_ENTITY)
        }

        order.status = 'complete';

        const result = await this.orderRepository.save(order);

        console.info("Status of order changed to (complete) successfuly order: ", order.orderId)

        return result;
    }

    async getAll(): Promise<OrderEntity[]>{
        return await this.orderRepository.find()
    }

    async removeFromOrder(user: UserEntity, OrderID: number, orderProductId: number): Promise<OrderEntity>{
        const order = await this.orderRepository.findOne({where: {orderId: OrderID}})

        if(order.user.userId != user.userId){
            throw new HttpException('not authorized', HttpStatus.UNAUTHORIZED)
        }

        if(!order){
            throw new HttpException('this order doesnot exist!',HttpStatus.UNPROCESSABLE_ENTITY)
        }

        if(order.status == 'in progress' || order.status == 'complete'){
            throw new HttpException('order most be on (pending) status for this request!',HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const orderProduct = await this.orderProductRepository.findOne({ where: {id: orderProductId}});

        if(!orderProduct){
            throw new HttpException('this item doesnot exist!',HttpStatus.UNPROCESSABLE_ENTITY)
        }

        if(orderProduct.order.orderId != order.orderId){
            throw new HttpException('this item doesnot exist in this order!',HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const orderedProduct = orderProduct.product;

        orderedProduct.stockCount = Number(orderedProduct.stockCount) + Number(orderProduct.quantity)

        await this.ProductRepository.save(orderedProduct);

        order.totalPrice = Number(order.totalPrice) - ( Number(orderedProduct.price) * Number(orderProduct.quantity))

        await this.orderProductRepository.delete(orderProduct);

        console.info("item deleted from the order successfully: ", order.orderId)

        return await this.orderRepository.save(order)
    }
}
