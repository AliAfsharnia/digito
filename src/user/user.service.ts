import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './DTO/createUser.Dto';
import { UpdateUserDto } from './DTO/updateUser.Dto';
import { UserDto } from './DTO/user.Dto';
import { plainToInstance } from 'class-transformer';
import { UpdateUserPhotoDto } from './DTO/updateUserPhoto.Dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){}

    async createUser(createUserDto: CreateUserDTO): Promise<UserDto>{

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

        const user = await this.userRepository.save(newUser);
        const userDto = plainToInstance(UserDto, user, { excludeExtraneousValues: true });

        console.info("User registered successfully: ", userDto.id);

        return userDto;
    }

    async findOneByEmail(email: string): Promise<UserDto> {
        const user = await this.userRepository.findOne({where:{ email : email}})
        const userDto = plainToInstance(UserDto, user, { excludeExtraneousValues: true });

        return userDto;
    }

    async findById(id: number):Promise<UserDto>{
        const user = await this.userRepository.findOne({where:{ id : id}})
        const userDto = plainToInstance(UserDto, user, { excludeExtraneousValues: true });
        if (userDto && userDto.image) {
            const imageUrl = `data:image/jpeg;base64,${userDto.image}`;
            userDto.image = imageUrl;
          }

        return userDto;
    }

    async updateUser(currentid :number, updateUserDto:UpdateUserDto):Promise<UserDto>{
        const currentUser = await this.userRepository.findOne({where:{id : currentid}})

        const userByEmail = await this.userRepository.findOne({
            where:{email :updateUserDto.email}
        })
    
        const userByUsername = await this.userRepository.findOne({
            where:{username :updateUserDto.username}
        })
    
        if( userByEmail || userByUsername){
            throw new HttpException('email or username are taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }
    

        Object.assign(currentUser, updateUserDto);

        const user = await this.userRepository.save(currentUser)
        const userDto = plainToInstance(UserDto, user, { excludeExtraneousValues: true });

        console.info("User updated successfully: ", userDto.id);

        return userDto;
    }

    async updateUserPhoto(currentid :number, updateUserPhotoDto:UpdateUserPhotoDto):Promise<UserDto>{
        const currentUser = await this.userRepository.findOne({where:{id : currentid}})    

        Object.assign(currentUser, updateUserPhotoDto);

        const user = await this.userRepository.save(currentUser)
        const userDto = plainToInstance(UserDto, user, { excludeExtraneousValues: true });

        console.info("User profile photo updated successfully: ", userDto.id);

        return userDto;
    }
}
