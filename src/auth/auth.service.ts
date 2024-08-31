import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDTO } from 'src/user/DTO/loginUser.Dto';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserResponsIntereface } from 'src/user/type/userResponse.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor( private readonly jwtService: JwtService, @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    async createJwtToken(user: UserEntity): Promise<string>{
        const payload = { sub: user.userId, username: user.username };
        return  await this.jwtService.signAsync(payload)

    }

    async signIn(loginUserDto: LoginUserDTO): Promise<UserEntity> {
        const user = await this.userRepository.findOne({where: {email: loginUserDto.email}, select:{userId: true,bio: true, email: true,username: true,image: true, isAdmin: true,password: true}});
        if (!user) {
            throw new UnauthorizedException();
        }    
        const isPasswordCorrect = await compare(loginUserDto.password,  user.password);

        delete user.password;

        if (!isPasswordCorrect) {
        throw new UnauthorizedException();
        }
        
        return  user
    }

    async BuildLoginRespose(user: UserEntity):Promise<UserResponsIntereface>{
        return {user:
                {...user,
                token: await this.createJwtToken(user)
                }
            }
    }
}