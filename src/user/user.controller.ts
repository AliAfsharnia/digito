import { Body, Controller, Get, Post, Put, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDTO } from './DTO/createUser.Dto';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './DTO/updateUser.Dto';
import { AdminAuthGuard } from 'src/auth/Guards/auth.admin.guard';
import { UserDto } from './DTO/user.Dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { s3 } from 'src/s3.config';
import * as multerS3 from 'multer-s3';
import { UpdateUserPhotoDto } from './DTO/updateUserPhoto.Dto';

@ApiTags("users")
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
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
    async createUser(@Body() createUserDTO: CreateUserDTO, @UploadedFiles() profilePicture: S3File[]):Promise<UserDto>{

        if (profilePicture) {
            createUserDTO.image = profilePicture.map(file => file.location)[0];
            console.log(createUserDTO);
        }

        return await this.userService.createUser(createUserDTO);
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
        description: "Body for updating User",
    })
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe)
    async updateUser(@User() currentUser, @Body() updateUserPhotoDto: UpdateUserPhotoDto):Promise<UserDto>{
        return this.userService.updateUserPhoto(currentUser.userId ,updateUserPhotoDto)
    }

    @ApiBearerAuth()
    @Put('avatar')
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
        type: UpdateUserPhotoDto,
        description: "Body for updating User",
    })
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe)
    async updateUserPhoto(@User() currentUser, @Body() updateUserPhotoDto: UpdateUserPhotoDto, @UploadedFiles() profilePicture: S3File[]):Promise<UserDto>{
        if (profilePicture) {
            updateUserPhotoDto.image = profilePicture.map(file => file.location)[0];
        }
        return this.userService.updateUserPhoto(currentUser.userId ,updateUserPhotoDto)
    }

    @ApiBearerAuth()
    @Get('isAdmin')
    @UseGuards(AdminAuthGuard)
    async isAdmin(@User() currentUser):Promise<UserDto>{
        return await this.userService.findById(currentUser.userId)
    }
}

