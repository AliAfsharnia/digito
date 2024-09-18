import { UserEntity } from "src/user/user.entity";
import {  Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProvinceEntity } from "./province.entity";
import { CityEntity } from "./city.entity";

@Entity({name: 'addresses'})
export class AddressEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    street: string;

    @Column()
    tag: string;

    @ManyToOne(()=> UserEntity ,(user) => user.addresses, {eager: true})
    user: UserEntity;

    @ManyToOne(()=> CityEntity ,(city) => city.addresses, {eager: true})
    city: CityEntity;

}
