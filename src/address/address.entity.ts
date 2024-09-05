import { UserEntity } from "src/user/user.entity";
import {  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProviceEntity } from "./provice.entity";
import { CityEntity } from "./city.entity";

@Entity({name: 'addresses'})
export class AddressEntity{
    @PrimaryGeneratedColumn()
    addressId: number;

    @Column()
    country: string;

    @Column()
    state: string;

    @Column()
    street: string;

    @Column()
    tag: string;

    @ManyToOne(()=> UserEntity ,(user) => user.addresses)
    user: UserEntity;

    @ManyToOne(()=> CityEntity ,(city) => city.addresses)
    city: CityEntity;
    
    @ManyToOne(()=> ProviceEntity ,(provice) => provice.addresses)
    provice: ProviceEntity;
}
