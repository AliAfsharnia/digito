import { InjectRepository } from "@nestjs/typeorm";
import { BrandEntity } from "src/brand/brand.entity";
import { CategoryEntity } from "src/category/category.entity";
import { ReviewEntity } from "src/review/review.entity";
import { AfterInsert, Column, DataSource, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Repository } from "typeorm";

@Entity({name: 'products'})
export class ProductEntity{ 
    @PrimaryGeneratedColumn()
    productId: number;

    @Column()
    title: string;

    @Column({default: 0})
    stockCount: number;

    @Column()
    price: number;

    @Column({default: 0})
    favoritesCount: number;

    @Column({default: ''})
    seller: string;

    @Column({default: ''})
    garanty: string;

    @Column({default: ''})
    description: string;

    @Column('simple-array')
    images: string[];

    @Column('simple-array')
    colors: string[];
z
    @ManyToOne(()=> BrandEntity ,(brand) => brand.products , {eager : true})
    brand: BrandEntity;

    @ManyToOne(()=> CategoryEntity ,(category) => category.products , {eager : true})
    category: CategoryEntity;

    @OneToMany(() => ReviewEntity, (review) => review.product)
    rewiews: ReviewEntity;
}


