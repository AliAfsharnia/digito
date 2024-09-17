import { UserEntity } from "src/user/user.entity";
import {  Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProvinceEntity } from "./province.entity";
import { CityEntity } from "./city.entity";

@Entity({name: 'addresses'})
export class AddressEntity{
    @PrimaryGeneratedColumn()
    addressId: number;

    @Column()
    description: string;

    @Column()
    street: string;

    @Column()
    tag: string;

    @ManyToOne(()=> UserEntity ,(user) => user.addresses)
    user: UserEntity;

    @ManyToOne(()=> CityEntity ,(city) => city.addresses)
    city: CityEntity;
    
    @ManyToOne(()=> ProvinceEntity ,(province) => province.addresses)
    province: ProvinceEntity;
}
