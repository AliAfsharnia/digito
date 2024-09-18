import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { UserEntity } from 'src/user/user.entity';
import { PlaceOrderDTO } from './DTO/placeOrder.DTO';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductEntity } from './orderProduct.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { Status } from './type/enums';

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

            console.info("Order created successfully: ", pendingOrder.id);
        } 
             const product = await this.ProductRepository.findOne({where: {id: placeOrderDto.productid}})

             if(!product){
                throw new HttpException("this product doesn't exist!",HttpStatus.UNPROCESSABLE_ENTITY)
             }

             if(product.stockCount < placeOrderDto.quantity){
                throw new HttpException('this product quantity is less then request!',HttpStatus.UNPROCESSABLE_ENTITY)
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
             
            console.info("item added to order successfully: ",newOrder.id )

             return newOrder
    }

    async createNewOrder(user:UserEntity):Promise<OrderEntity>{
        
    
        
            let pendingOrder = this.orderRepository.create(); 
            pendingOrder.user = user;
            pendingOrder.status = Status.pending;
            pendingOrder.totalPrice = 0;
            pendingOrder.quantity = 0;
            
            pendingOrder = await this.orderRepository.save(pendingOrder);
            console.info("Order created successfully: ", pendingOrder.id);
        

        return pendingOrder
    }

    async myOrders(user: UserEntity): Promise<OrderEntity[]>{
        const order =  await this.orderRepository.find({where: {user: user}});

        return order;
    }

    async orderedProducts(user: UserEntity, id: number): Promise<OrderProductEntity[]>{
        const order = await this.orderRepository.findOne({where: {id: id}, relations: ['orderProducts', 'user']});

        if(!order){
            throw new HttpException("this order doesn't exist!",HttpStatus.UNPROCESSABLE_ENTITY)
        }

        if(order.user.id != user.id){
            throw new HttpException('not authorized', HttpStatus.UNAUTHORIZED)
        }

        const items = order.orderProducts;

        return items
    }

    async orderedProductsAdmin(id: number): Promise<OrderProductEntity[]>{
        const order = await this.orderRepository.findOne({where: {id: id}});

        if(!order){
            throw new HttpException("this order doesn't exist!",HttpStatus.UNPROCESSABLE_ENTITY)
        }

        return await this.orderProductRepository.find({where: {order}})
    }

    async changeOrderStatus(status: string, id: number): Promise<OrderEntity>{
        const order = await this.orderRepository.findOne({ where: {id: id}})

        if(!order){
            throw new HttpException("this order doesn't exist!",HttpStatus.UNPROCESSABLE_ENTITY)
        }

        order.status = status;
        const result = await this.orderRepository.save(order);

        console.info("Status of order ", order.id," changed to : ", status)

        return result;
    }

    async getAll(): Promise<OrderEntity[]>{
        return await this.orderRepository.find({ relations: [ 'user']})
    }

    async removeFromOrder(user: UserEntity, id: number, orderid: number): Promise<OrderEntity>{
        const order = await this.orderRepository.findOne({where: {id: id}})

        if(order.user.id != user.id){
            throw new HttpException('not authorized', HttpStatus.UNAUTHORIZED)
        }

        if(!order){
            throw new HttpException("this order doesn't exist!",HttpStatus.UNPROCESSABLE_ENTITY)
        }

        if(order.status == 'in progress' || order.status == 'complete'){
            throw new HttpException('order most be on (pending) status for this request!',HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const orderProduct = await this.orderProductRepository.findOne({ where: {id: orderid}});

        if(!orderProduct){
            throw new HttpException("this item doesn't exist!",HttpStatus.UNPROCESSABLE_ENTITY)
        }

        if(orderProduct.order.id != order.id){
            throw new HttpException("this item doesn't exist in this order!",HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const orderedProduct = orderProduct.product;

        orderedProduct.stockCount = Number(orderedProduct.stockCount) + Number(orderProduct.quantity)

        await this.ProductRepository.save(orderedProduct);

        order.totalPrice = Number(order.totalPrice) - ( Number(orderedProduct.price) * Number(orderProduct.quantity))

        await this.orderProductRepository.delete(orderProduct);

        console.info("item deleted from the order successfully: ", order.id)

        return await this.orderRepository.save(order)
    }
}
