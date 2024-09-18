import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity({name: 'attributes'})
export class AttributesEntity{ 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: string;

    @Column({default: 0})
    value: string;
z
    @ManyToOne(()=> ProductEntity ,(products) => products.attributes)
    product: ProductEntity;
}


