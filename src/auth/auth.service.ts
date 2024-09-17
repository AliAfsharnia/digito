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
import { CostExplorer } from 'aws-sdk';

@Injectable()
export class AuthService {
    constructor( private readonly jwtService: JwtService, @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly mailService: MailerService) {}

    async createJwtToken(user: UserEntity): Promise<string>{
        const payload = { sub: user.userId, username: user.username };
        const token =  await this.jwtService.signAsync(payload)
        console.info("token created successfully for user: ", user.userId)
        return token;

    }

    async signIn(loginUserDto: LoginUserDTO): Promise<UserEntity> {
        const user = await this.userRepository.findOne({where: {email: loginUserDto.email}, select:{userId: true,bio: true, email: true,username: true,image: true, roll: true,password: true}});
        if (!user) {
            throw new UnauthorizedException();
        }    
        const isPasswordCorrect = await compare(loginUserDto.password,  user.password);

        delete user.password;

        if (!isPasswordCorrect) {
        throw new UnauthorizedException();
        }
        
        console.info("User logged in successfully:", user.userId)
        return  user
    }

    async BuildLoginResponse(user: UserEntity):Promise<UserResponsIntereface>{
        return {user:
                {...user,
                token: await this.createJwtToken(user)
                }
            }
    }

    async forgotPassword(username: string): Promise<void>{
        const user = await this.userRepository.findOne({where: {username: username}})

        if(!user){
            throw new HttpException("user not found!", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const token = await this.createJwtToken(user);
        const message = `Forgot your password? If you didn't forget your password, please ignore this email! link = ${process.env.BASE_URL}/resetPassword/${token}`;

        this.mailService.sendMail({
            from: `Ali Afsharnia<${process.env.EMAIL_USERNAME}>`,
            to: user.email,
            subject: `reset password`,
            text: message,
            });

        console.info("Forgot password email send successfully for user:", user.userId);
    }

    async resetPassword(token: string, resetPasswordDTO: ResetPasswordDTO): Promise<UserDto>{
        const decode = verify(token ,jwtConstants.secret);
        const user = await this.userRepository.findOne({where:{userId: +decode.sub}})

        if(!user){
            throw new HttpException("user not found or token is expired!", HttpStatus.FORBIDDEN)
        }

        Object.assign(user, resetPasswordDTO);

        const newUser= await this.userRepository.save(user);

        const userDto = plainToInstance(UserDto, newUser, { excludeExtraneousValues: true });

        console.info("password changed successfully for user:", user.userId);

        return userDto;
    }
}