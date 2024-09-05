import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { AddressEntity } from "./address.entity";
import { CityEntity } from "./city.entity";

@Entity({name: 'provinces'})
export class ProviceEntity{
    @PrimaryColumn()
    id:number;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column()
    tel_prefix: string;

    @OneToMany(() => CityEntity, (city) => city.provice)
    city: CityEntity;

    @OneToMany(() => AddressEntity, (address) => address.provice)
    addresses: AddressEntity;
}