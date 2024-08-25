import { Body, Controller, Get, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDTO } from './DTO/creatUser.Dto';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { User } from './decoratores/user.decorator';
import { UpdateUserDto } from './DTO/updateUser.Dto';
import { AdminAuthGuard } from 'src/auth/Guards/auth.admin.guard';
import { UserDto } from './DTO/user.Dto';
import { ProductEntity } from 'src/product/product.entity';

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
    async createUser(@Body() createUserDTO: CreateUserDTO):Promise<UserDto>{
        const user = await this.userService.createUser(createUserDTO);
        return user
    }

    @ApiBearerAuth()
    @Get()
    @UseGuards(AuthGuard)
    async getCurrentUser(@User() currentUserId):Promise<UserDto>{
        return this.userService.findById(currentUserId.userId)
    }

    @ApiBearerAuth()
    @Put()
    @ApiBody({
        type: UpdateUserDto,
        description: "Body for updating User"
    })
    @UseGuards(AuthGuard)
    async updateUser(@User() currentUser, @Body() updateUserDto: UpdateUserDto):Promise<UserDto>{
        return this.userService.updateUser(currentUser.userId ,updateUserDto)
    }

    @ApiBearerAuth()
    @Get('isAdmin')
    @UseGuards(AdminAuthGuard)
    async isAdmin(@User() currentUser):Promise<UserDto>{
        return await this.userService.findById(currentUser.userId)
    }

    
}
