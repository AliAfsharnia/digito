import { Body, Controller, Get, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDTO } from './DTO/creatUser.Dto';
import { UserType } from './type/user.type';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { User } from './decoratores/user.decorator';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './DTO/updateUser.Dto';

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

    @ApiBearerAuth()
    @Get()
    @UseGuards(AuthGuard)
    async getCurrentUser(@User() currentUserId):Promise<UserEntity>{
        return this.userService.findById(currentUserId.id)
    }

    @ApiBearerAuth()
    @Put()
    @ApiBody({
        type: UpdateUserDto,
        description: "Body for updating User"
    })
    @UseGuards(AuthGuard)
    async updateUser(@User() currentUserId, @Body() updateUserDto: UpdateUserDto):Promise<UserEntity>{
        return this.userService.updateUser(currentUserId.id ,updateUserDto)
    }

}
