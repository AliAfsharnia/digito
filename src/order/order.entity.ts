import { UserEntity } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany, BeforeUpdate } from "typeorm";
import { OrderProductEntity } from "./orderProduct.entity";

@Entity({ name: 'orders' })
export class OrderEntity {
    @PrimaryGeneratedColumn()
    orderId: number;

    @ManyToOne(() => UserEntity, (user) => user.orders, {eager : true})
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @OneToMany(() => OrderProductEntity,(order) => order.order,)
    orderProducts: OrderProductEntity[];

    @Column({ type: 'decimal' })
    totalPrice: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    orderDate: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column({ type: 'varchar', length: 255, default: 'pending' })
    status: string;

    @BeforeUpdate()
    updateTimestamp(){
        this.updatedAt = new Date();
    }

}
