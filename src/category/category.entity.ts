import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'category'})
export class CategoryEntity{
    @PrimaryGeneratedColumn()
    brandId: number;

    @Column()
    slug: string;

    @Column()
    name: string;

    @Column({default: 0})
    count: number;

    @Column({default: ''})
    description: string;

    @Column({default: ''})
    image: string;

}
