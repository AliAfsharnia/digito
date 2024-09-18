import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { AddressEntity } from "./address.entity";
import { CityEntity } from "./city.entity";

@Entity({name: 'provinces'})
export class ProvinceEntity{
    @PrimaryColumn()
    id:number;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column()
    tel_prefix: string;

    @OneToMany(() => CityEntity, (city) => city.province)
    city: CityEntity;
}