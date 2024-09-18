import { Get, Body, Controller, Param, Post, Put, UseGuards, UsePipes, ValidationPipe, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDTO } from './DTO/createCategory.Dto';
import { AdminAuthGuard } from 'src/auth/Guards/auth.admin.guard';
import { CategoryEntity } from './category.entity';
import { UpdateCategoryDTO } from './DTO/updateCategory.Dto';
import { extname } from 'path';
import { s3 } from 'src/s3.config';
import * as multerS3 from 'multer-s3';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { UpdateCategoryPhotoDto } from './DTO/updateCategoryPhoto.Dto';

@ApiTags('category')
@Controller()
export class CategoryController {

    constructor(private readonly categoryService: CategoryService){}

    @Get('category')
    async getAllCategory():Promise<CategoryEntity[]>{
        return this.categoryService.getAllCategory();
    }

    @Get('category/:id')
    async getOneCategory(@Param('id') id: string):Promise<CategoryEntity>{
        return this.categoryService.getOneCategory(+id);
    }

    @ApiBearerAuth()
    @Post('category')
    @UseInterceptors(
        AnyFilesInterceptor({
            storage: multerS3({
              s3: s3,
              bucket: process.env.LIARA_BUCKET_NAME,
              acl: 'public-read',
              key: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const fileExtension = extname(file.originalname);
                cb(null, `category-pictures/${file.fieldname}-${uniqueSuffix}${fileExtension}`);
              },
            }),
          }),
      )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: CreateCategoryDTO,
        description: "Body for creating Category"
    })
    @UsePipes(new ValidationPipe)
    @UseGuards(AdminAuthGuard)
    async createCategory( @Body() createCategoryDTO: CreateCategoryDTO, @UploadedFiles() categoryPicture: S3File[]):Promise<CategoryEntity>{

        if (categoryPicture) {
            createCategoryDTO.image = categoryPicture.map(file => file.location)[0];
        }
        return await this.categoryService.createCategory(createCategoryDTO);
    } 

    @ApiBearerAuth()
    @Put('category/:id')
    @ApiParam({
        name: 'id',
        required: true,
    })
    @ApiBody({
        type: UpdateCategoryDTO,
        description: "Body for updating Category" 
    })
    @UseGuards(AdminAuthGuard)
    async updateCategory(@Param('id') id: string, @Body() updateCategoryDTO: UpdateCategoryDTO):Promise<CategoryEntity>{
        return await this.categoryService.updateCategory(+id ,updateCategoryDTO);
    }

    @ApiBearerAuth()
    @Put('categoryavatar/:id')
    @UseInterceptors(
        AnyFilesInterceptor({
            storage: multerS3({
              s3: s3,
              bucket: process.env.LIARA_BUCKET_NAME,
              acl: 'public-read',
              key: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const fileExtension = extname(file.originalname);
                cb(null, `category-pictures/${file.fieldname}-${uniqueSuffix}${fileExtension}`);
              },
            }),
          }),
      )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: UpdateCategoryPhotoDto,
        description: "Body for creating Category"
    })
    @UsePipes(new ValidationPipe)
    @UseGuards(AdminAuthGuard)
    async updateCategoryPhoto( @Param('id') id: string, @Body() UpdateCategoryPhotoDto: CreateCategoryDTO, @UploadedFiles() categoryPicture: S3File[]):Promise<CategoryEntity>{

        if (categoryPicture) {
            UpdateCategoryPhotoDto.image = categoryPicture.map(file => file.location)[0];
        }
        return await this.categoryService.updateCategoryPhoto(+id, UpdateCategoryPhotoDto);
    } 
}
