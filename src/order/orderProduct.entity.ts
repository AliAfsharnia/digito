import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";
import { ProductEntity } from "src/product/product.entity";

@Entity('order_products')
export class OrderProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => OrderEntity, (order) => order.orderProducts, {eager : true})
    order: OrderEntity;

    @ManyToOne(() => ProductEntity, {eager : true})
    product: ProductEntity;

    @Column()
    quantity: number;  
}
