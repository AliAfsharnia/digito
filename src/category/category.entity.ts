import { ProductEntity } from "src/product/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'category'})
export class CategoryEntity{
    @PrimaryGeneratedColumn()
    categoryId: number;

    @Column()
    slug: string;

    @Column()
    name: string;

    @Column({default: ''})
    description: string;

    @Column({default: ''})
    image: string;

    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity;
}

