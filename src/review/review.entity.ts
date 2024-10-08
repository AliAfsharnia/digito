import { ProductEntity } from "src/product/product.entity";
import { UserEntity } from "src/user/user.entity";
import {  Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'reviews'})
export class ReviewEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subject: string;

    @Column('float')
    rating: number;

    @Column({default: "" })
    context: string;

    @Column({default: false})
    approved: boolean;

    @ManyToOne(()=> ProductEntity ,(product) => product.reviews , {eager : true})
    product: ProductEntity;

    @ManyToOne(()=> UserEntity ,(user) => user.reviews , {eager : true})
    user: UserEntity;

}
