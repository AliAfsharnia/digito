import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { AddressEntity } from "./address.entity";
import { ProvinceEntity } from "./province.entity";

@Entity({name: 'cities'})
export class CityEntity{
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slug: string;

    @OneToMany(() => AddressEntity, (address) => address.user)
    addresses: AddressEntity;

    @ManyToOne(()=> ProvinceEntity ,(province) => province.city, {eager: true})
    province: ProvinceEntity;
}