import { ProductEntity } from "src/product/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, RelationCount } from "typeorm";

@Entity({name: 'brands'})
export class BrandEntity{
    @PrimaryGeneratedColumn()
    brandId: number;

    @Column()
    name: string;

    @Column({default: ''})
    description: string;

    @Column({default: ''})
    image: string;

    @OneToMany(() => ProductEntity, (product) => product.brand)
    products: ProductEntity;
}
