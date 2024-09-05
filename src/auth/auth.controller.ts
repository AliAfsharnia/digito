import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginUserDTO } from 'src/user/DTO/loginUser.Dto';
import { UserResponsIntereface } from 'src/user/type/userResponse.interface';
import { UserEntity } from 'src/user/user.entity';
import { ResetPasswordDTO } from './DTO/resetPassword.dto';
import { UserDto } from 'src/user/DTO/user.Dto';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    @ApiBody({
        type: LoginUserDTO,
        description: "Body for Login"
    })
    @UsePipes(new ValidationPipe)
    async createUser(@Body() loginUserDTO: LoginUserDTO):Promise<UserResponsIntereface>{
        const user = await this.authService.signIn(loginUserDTO)
        delete user.password;
        return await this.authService.BuildLoginRespose(user);
    }

    @Get('forgotpassword/:username')
    async forgotPassword(@Param('username') username: string): Promise<string>{
        await this.authService.forgotPassword(username);
        return "you will recive an email soon!"
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
