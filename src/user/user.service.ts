import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './DTO/creatUser.Dto';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from './DTO/updateUser.Dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){}

    async createUser(createUserDto: CreateUserDTO): Promise<UserEntity>{

        const userByEmail = await this.userRepository.findOne({
            where:{email :createUserDto.email}
        })
    
        const userByUsername = await this.userRepository.findOne({
            where:{username :createUserDto.username}
        })
    
        if( userByEmail || userByUsername){
            throw new HttpException('email or username are taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }
    
        const newUser = new UserEntity();

        Object.assign(newUser,createUserDto);

        return await this.userRepository.save(newUser);
    }

    async findOneByEmail(email: string): Promise<UserEntity> {
        return this.userRepository.findOne({where:{ email : email}})
    }

    async findById(id: number):Promise<UserEntity>{
        const user = await this.userRepository.findOne({where:{ userId : id}})
        return user
    }

    async updateUser(currentUserId :number, updateUserDto:UpdateUserDto):Promise<UserEntity>{
        const user = await this.userRepository.findOne({where:{userId : currentUserId}})

        Object.assign(user, updateUserDto);

        return await this.userRepository.save(user);
    }
}
