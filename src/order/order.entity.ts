import { UserEntity } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany, BeforeUpdate } from "typeorm";
import { OrderProductEntity } from "./orderProduct.entity";
import { Status } from "./type/enums";

@Entity({ name: 'orders' })
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.orders, {eager : true})
    user: UserEntity;

    @OneToMany(() => OrderProductEntity,(order) => order.order,)
    orderProducts: OrderProductEntity[];

    @Column({ type: 'decimal' })
    totalPrice: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    orderDate: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column({ type: 'varchar', length: 255, default: Status.pending })
    status: string;

    @Column({ default: 0})
    quantity: number;
    
    @BeforeUpdate()
    updateTimestamp(){
        this.updatedAt = new Date();
    }

}
