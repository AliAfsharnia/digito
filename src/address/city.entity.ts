import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { AddressEntity } from "./address.entity";
import { ProviceEntity } from "./provice.entity";

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

    @ManyToOne(()=> ProviceEntity ,(provice) => provice.city )
    provice: ProviceEntity;
}