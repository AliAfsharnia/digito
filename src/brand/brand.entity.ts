import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'brands'})
export class BrandEntity{
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
