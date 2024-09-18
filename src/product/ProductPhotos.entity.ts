import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity({name: 'product_photos'})
export class ProductPhotoEntity{ 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image: string;

    @ManyToOne(() => ProductEntity ,(product) => product.images)
    product: ProductEntity;
}


