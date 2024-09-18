import { hash } from "bcrypt";
import { AddressEntity } from "src/address/address.entity";
import { OrderEntity } from "src/order/order.entity";
import { ProductEntity } from "src/product/product.entity";
import { ReviewEntity } from "src/review/review.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column({default: ''})
    bio: string;

    @Column({default: ''})
    image: string;
    
    @Column({select: false})
    password: string;

    @Column({default: 'customer'})
    role: string;

    private previousPassword: string;

    @BeforeUpdate()
    private storePreviousPassword() {
        this.previousPassword = this.password;
    }

    @BeforeUpdate()
    @BeforeInsert()
    async hashPassword() {
        if (this.password !== this.previousPassword) {
            this.password = await hash(this.password, 10);
        }
    }
    
    @ManyToMany(() => ProductEntity )
    @JoinTable()
    favorites: ProductEntity[];

    @OneToMany(() => ReviewEntity, (review) => review.user)
    reviews: ReviewEntity[];

    @OneToMany(() => AddressEntity, (address) => address.user)
    addresses: AddressEntity[];

    @OneToMany(() => OrderEntity, (order) => order.user)
    orders: OrderEntity[]

}
