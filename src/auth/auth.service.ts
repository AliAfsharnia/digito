import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDTO } from 'src/user/DTO/loginUser.Dto';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserResponsIntereface } from 'src/user/type/userResponse.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { verify } from 'jsonwebtoken';
import { jwtConstants } from './constants';
import { ResetPasswordDTO } from './DTO/resetPassword.dto';
import { UserDto } from 'src/user/DTO/user.Dto';
import { plainToInstance } from 'class-transformer';
import { CreateUserDTO } from 'src/user/DTO/createUser.Dto';
import { Massages } from 'src/massages/massages';

@Injectable()
export class AuthService {
    constructor( private readonly jwtService: JwtService, @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly mailService: MailerService) {}

    async createJwtToken(user: UserEntity): Promise<string>{
        const payload = { sub: user.id, username: user.username };
        const token =  await this.jwtService.signAsync(payload)
        console.info(Massages.TOKEN_CREATED, user.id)
        return token;

    }

    async createUser(createUserDto: CreateUserDTO): Promise<UserEntity>{

        const userByEmail = await this.userRepository.findOne({
            where:{email :createUserDto.email}
        })
    
        const userByUsername = await this.userRepository.findOne({
            where:{username :createUserDto.username}
        })
    
        if( userByEmail || userByUsername){
            throw new HttpException(Massages.EMAIL_OR_USER_TAKEN, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    
        const newUser = new UserEntity();

        Object.assign(newUser,createUserDto);

        const user = await this.userRepository.save(newUser);

        console.info(Massages.USER_REGISTER, user.id);

        return user;
    }

    async login(loginUserDto: LoginUserDTO): Promise<UserEntity> {
        const user = await this.userRepository.findOne({where: {email: loginUserDto.email}, select:{id: true,bio: true, email: true,username: true,image: true, role: true,password: true}});
        if (!user) {
            throw new UnauthorizedException();
        }    
        const isPasswordCorrect = await compare(loginUserDto.password,  user.password);

        delete user.password;

        if (!isPasswordCorrect) {
        throw new UnauthorizedException();
        }
        
        console.info(Massages.USER_LOGGING, user.id)
        return  user
    }

    async BuildLoginResponse(user: UserEntity):Promise<UserResponsIntereface>{
        return {user:
                {...user,
                token: await this.createJwtToken(user)
                }
            }
    }

    async forgotPassword(email: string): Promise<void>{
        const user = await this.userRepository.findOne({where: {email: email}})

        if(!user){
            throw new HttpException(Massages.USER_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const token = await this.createJwtToken(user);
        const message = `Forgot your password? If you didn't forget your password, please ignore this email! link = ${process.env.BASE_URL}/resetPassword/${token}`;

        this.mailService.sendMail({
            from: `Ali Afsharnia<${process.env.EMAIL_USERNAME}>`,
            to: user.email,
            subject: `reset password`,
            text: message,
            });

        console.info(Massages.FORGOT_EMAIL_SENT, user.id);
    }

    async resetPassword(token: string, resetPasswordDTO: ResetPasswordDTO): Promise<UserDto>{
        const decode = verify(token ,jwtConstants.secret);
        const user = await this.userRepository.findOne({where:{id: +decode.sub}})

        if(!user){
            throw new HttpException(Massages.TOKEN_NOT_VALID, HttpStatus.FORBIDDEN)
        }

        Object.assign(user, resetPasswordDTO);

        const newUser= await this.userRepository.save(user);

        const userDto = plainToInstance(UserDto, newUser, { excludeExtraneousValues: true });

        console.info(Massages.PASSWORD_CHANGE, user.id);

        return userDto;
    }
}