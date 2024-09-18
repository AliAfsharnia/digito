import { Body, Controller, Get, Param, Post, Put, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { LoginUserDTO } from 'src/user/DTO/loginUser.Dto';
import { UserResponsIntereface } from 'src/user/type/userResponse.interface';
import { ResetPasswordDTO } from './DTO/resetPassword.dto';
import { UserDto } from 'src/user/DTO/user.Dto';
import { CreateUserDTO } from 'src/user/DTO/createUser.Dto';
import { extname } from 'path';
import { s3 } from 'src/s3.config';
import * as multerS3 from 'multer-s3';
import { AnyFilesInterceptor } from '@nestjs/platform-express';


@ApiTags("auth")
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    @UseInterceptors(
        AnyFilesInterceptor({
            storage: multerS3({
              s3: s3,
              bucket: process.env.LIARA_BUCKET_NAME,
              acl: 'public-read',
              key: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const fileExtension = extname(file.originalname);
                cb(null, `profile-pictures/${file.fieldname}-${uniqueSuffix}${fileExtension}`);
              },
            }),
          }),
      )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: CreateUserDTO,
        description: "Body for creating User"
    })
    @UsePipes(new ValidationPipe)
    async createUser(@Body() createUserDTO: CreateUserDTO, @UploadedFiles() profilePicture: S3File[]):Promise<UserResponsIntereface>{

        if (profilePicture) {
            createUserDTO.image = profilePicture.map(file => file.location)[0];
            console.log(createUserDTO);
        }

        const user = await this.authService.createUser(createUserDTO);
        delete user.password;
        return await this.authService.BuildLoginResponse(user);
    }


    @Post('login')
    @ApiBody({
        type: LoginUserDTO,
        description: "Body for Login"
    })
    @UsePipes(new ValidationPipe)
    async login(@Body() loginUserDTO: LoginUserDTO):Promise<UserResponsIntereface>{
        const user = await this.authService.login(loginUserDTO)
        delete user.password;
        return await this.authService.BuildLoginResponse(user);
    }

    @Get('forgotpassword/:email')
    async forgotPassword(@Param('email') email: string): Promise<string>{
        await this.authService.forgotPassword(email);
        return "you will receive an email soon!"
    }

    @ApiBody({
        type: ResetPasswordDTO,
        description: "Body for new password"
    })
    @Put('resetPassword/:token')
    async resetPassword(@Param('token') token: string, @Body() resetPasswordDTO: ResetPasswordDTO): Promise<UserDto>{
        return await this.authService.resetPassword(token, resetPasswordDTO);
    }
}
