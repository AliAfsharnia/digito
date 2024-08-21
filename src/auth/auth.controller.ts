import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginUserDTO } from 'src/user/DTO/loginUser.Dto';
import { UserResponsIntereface } from 'src/user/type/userResponse.interface';

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
}
