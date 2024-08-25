import { hash } from "bcrypt";
import { ProductEntity } from "src/product/product.entity";
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class UserEntity{
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column({default: ''})
    bio: string;

    @Column({default: ''})
    image: string;
    
    @Column({select: true})
    password: string;

    @Column({default: 0})
    isAdmin: number;

    @BeforeInsert()
    async hashPassword(){
        this.password = await hash(this.password, 10)
    }

    @ManyToMany(() => ProductEntity )
    @JoinTable()
    favorites: ProductEntity[];
}
