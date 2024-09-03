import { Body, Controller, Get, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDTO } from './DTO/creatUser.Dto';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { User } from './decoratores/user.decorator';
import { UpdateUserDto } from './DTO/updateUser.Dto';
import { AdminAuthGuard } from 'src/auth/Guards/auth.admin.guard';
import { UserDto } from './DTO/user.Dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags("users")
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    @UseInterceptors(FileInterceptor('profilePicture', {
        storage: diskStorage({
          destination: './uploads/profile-pictures', 
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
          },
        })
      }))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: CreateUserDTO,
        description: "Body for creating User"
    })
    @UsePipes(new ValidationPipe)
    async createUser(@Body() createUserDTO: CreateUserDTO, @UploadedFile() profilePicture: Express.Multer.File):Promise<UserDto>{
        return await this.userService.createUser(createUserDTO, profilePicture);
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

