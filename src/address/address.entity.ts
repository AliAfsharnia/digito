import { ProductEntity } from "src/product/product.entity";
import { UserEntity } from "src/user/user.entity";
import {  Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'addresses'})
export class AddressEntity{
    @PrimaryGeneratedColumn()
    addressId: number;

    @Column()
    country: string;

    @Column()
    state: string;
    
    @Column()
    city: string;

    @Column()
    street: string;

    @Column()
    tag: string;

    @ManyToOne(()=> UserEntity ,(user) => user.addresses , {eager : true})
    user: UserEntity;

}
