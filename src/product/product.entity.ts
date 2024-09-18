import { BrandEntity } from "src/brand/brand.entity";
import { CategoryEntity } from "src/category/category.entity";
import { ReviewEntity } from "src/review/review.entity";
import { Column, DataSource, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Repository } from "typeorm";
import { AttributesEntity } from "./attributes.entity";
import { ProductPhotoEntity } from "./ProductPhotos.entity";

@Entity({name: 'products'})
export class ProductEntity{ 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({default: 0})
    stockCount: number;

    @Column()
    price: number;

    @Column({default: 0})
    favoritesCount: number;

    @Column({default: ''})
    guarantee: string;

    @Column({default: ''})
    description: string;

    @OneToMany(() => ProductPhotoEntity, (image) => image.product)
    images: ProductPhotoEntity[];

    @Column('simple-array')
    colors: string[];
z
    @ManyToOne(()=> BrandEntity ,(brand) => brand.products , {eager : true})
    brand: BrandEntity;

    @ManyToOne(()=> CategoryEntity ,(category) => category.products , {eager : true})
    category: CategoryEntity;

    @OneToMany(() => ReviewEntity, (review) => review.product)
    reviews: ReviewEntity;

    @OneToMany(() => AttributesEntity, (attribute) => attribute.product)
    attributes: AttributesEntity[];
}


