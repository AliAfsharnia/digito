import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDTO } from './DTO/creatUser.Dto';
import { UserType } from './type/user.type';

@ApiTags("users")
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    @ApiBody({
        type: CreateUserDTO,
        description: "Body for creating User"
    })
    @UsePipes(new ValidationPipe)
    async createUser(@Body() createUserDTO: CreateUserDTO):Promise<UserType>{
        const user = await this.userService.createUser(createUserDTO);
        delete user.password;
        return user
    }
}
