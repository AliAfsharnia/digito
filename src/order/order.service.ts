import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { UserEntity } from 'src/user/user.entity';
import { PlaceOrderDTO } from './DTO/placeOrder.DTO';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductEntity } from './orderProduct.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { Status } from './type/enums';
import { Massages } from 'src/massages/massages';

@Injectable()
export class OrderService {
    constructor(@InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderProductEntity) private readonly orderProductRepository: Repository<OrderProductEntity>,
    @InjectRepository(ProductEntity) private readonly ProductRepository: Repository<ProductEntity>){}
    async placeOrder(user: UserEntity, placeOrderDto:PlaceOrderDTO):Promise<OrderProductEntity>{
        let pendingOrder = await this.orderRepository.findOne({
            where: { user: user, status: Status.pending },
            relations: ['user'],
        });
        
        if (!pendingOrder) {
            pendingOrder = this.orderRepository.create(); 
            pendingOrder.user = user;
            pendingOrder.status = Status.pending;
            pendingOrder.totalPrice = 0;
            pendingOrder.quantity = 0;
            
            pendingOrder = await this.orderRepository.save(pendingOrder);

            console.info(Massages.ORDER_CREATE, pendingOrder.id);
        } 
             const product = await this.ProductRepository.findOne({where: {id: placeOrderDto.productid}})

             if(!product){
                throw new HttpException(Massages.PRODUCT_NOT_FOUND,HttpStatus.UNPROCESSABLE_ENTITY)
             }

             if(product.stockCount < placeOrderDto.quantity){
                throw new HttpException(Massages.PRODUCT_OUT_OF_STUCK,HttpStatus.UNPROCESSABLE_ENTITY)
             }
             
             product.stockCount = (product.stockCount - placeOrderDto.quantity);
             pendingOrder.totalPrice = Number(pendingOrder.totalPrice) + (Number(product.price) * Number(placeOrderDto.quantity))
             let newOrder = this.orderProductRepository.create();
             newOrder.product = await this.ProductRepository.save(product);
             pendingOrder.quantity = Number(pendingOrder.quantity) + Number(placeOrderDto.quantity)
             newOrder.order = await this.orderRepository.save(pendingOrder);
             newOrder.quantity = placeOrderDto.quantity;
             newOrder.totalPrice = 0;
             newOrder.totalPrice = Number(product.price) * Number(placeOrderDto.quantity)
             newOrder = await this.orderProductRepository.save(newOrder);
             
            console.info(Massages.ITEM_ADDED,newOrder.id )

             return newOrder
    }

    async myOrders(user: UserEntity): Promise<OrderEntity[]>{
        const order =  await this.orderRepository.find({where: {user: user}});

        return order;
    }

    async orderedProducts(user: UserEntity, id: number): Promise<OrderProductEntity[]>{
        const order = await this.orderRepository.findOne({where: {id: id}, relations: ['orderProducts', 'user']});

        if(!order){
            throw new HttpException(Massages.ORDER_NOT_FOUND,HttpStatus.UNPROCESSABLE_ENTITY)
        }

        if(order.user.id != user.id){
            throw new HttpException(Massages.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED)
        }

        const items = order.orderProducts;

        return items
    }

    async orderedProductsAdmin(id: number): Promise<OrderProductEntity[]>{
        const order = await this.orderRepository.findOne({where: {id: id}});

        if(!order){
            throw new HttpException(Massages.ORDER_NOT_FOUND,HttpStatus.UNPROCESSABLE_ENTITY)
        }

        return await this.orderProductRepository.find({where: {order}})
    }

    async changeOrderStatus(status: string, id: number): Promise<OrderEntity>{
        const order = await this.orderRepository.findOne({ where: {id: id}})

        if(!order){
            throw new HttpException(Massages.ORDER_NOT_FOUND,HttpStatus.UNPROCESSABLE_ENTITY)
        }

        order.status = status;
        const result = await this.orderRepository.save(order);

        console.info("Status of order ", order.id," changed to : ", status)

        return result;
    }

    async getAll(): Promise<OrderEntity[]>{
        return await this.orderRepository.find({ relations: [ 'user']})
    }

    async removeFromOrder(user: UserEntity, id: number, orderId: number): Promise<OrderEntity>{
        const order = await this.orderRepository.findOne({where: {id: id}})

        if(order.user.id != user.id){
            throw new HttpException(Massages.NOT_AUTHORIZED ,HttpStatus.UNAUTHORIZED)
        }

        if(!order){
            throw new HttpException(Massages.ORDER_NOT_FOUND,HttpStatus.UNPROCESSABLE_ENTITY)
        }

        if(order.status == 'in progress' || order.status == 'complete'){
            throw new HttpException(Massages.ORDER_NOT_PENDING,HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const orderProduct = await this.orderProductRepository.findOne({ where: {id: orderId}});

        if(!orderProduct){
            throw new HttpException(Massages.ITEM_NOT_FOUND,HttpStatus.UNPROCESSABLE_ENTITY)
        }

        if(orderProduct.order.id != order.id){
            throw new HttpException(Massages.ITEM_NOT_IN_ORDER,HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const orderedProduct = orderProduct.product;

        orderedProduct.stockCount = Number(orderedProduct.stockCount) + Number(orderProduct.quantity)

        await this.ProductRepository.save(orderedProduct);

        order.totalPrice = Number(order.totalPrice) - ( Number(orderedProduct.price) * Number(orderProduct.quantity))

        await this.orderProductRepository.delete(orderProduct);

        console.info(Massages.ITEM_DELETED, order.id)

        return await this.orderRepository.save(order)
    }
}
