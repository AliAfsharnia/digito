import { Get, Body, Controller, Post, Put, UseGuards, UsePipes, ValidationPipe, Param, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { BrandService } from './brand.service';
import { CreateBrandDTO } from './DTO/createBrand.Dto';
import { BrandEntity } from './brand.entity';
import { AdminAuthGuard } from 'src/auth/Guards/auth.admin.guard';
import { UpdateBrandDTO } from './DTO/updateBrand.Dto';
import { extname } from 'path';
import { s3 } from 'src/s3.config';
import * as multerS3 from 'multer-s3';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { UpdateBrandPhotoDto } from './DTO/updateBrandPhoto.Dto';

@ApiTags("brands")
@Controller()
export class BrandController {
    constructor(private readonly brandService: BrandService){}

    @Get('brands')
    async getAllCategory():Promise<BrandEntity[]>{
        return this.brandService.getAllBrand();
    }

    @Get('brand/:id')
    async getOneCategory(@Param('id') id: number):Promise<BrandEntity>{
        return this.brandService.getOneBrand(+id);
    }

    @ApiBearerAuth()
    @Post('brand')
    @UseInterceptors(
        AnyFilesInterceptor({
            storage: multerS3({
              s3: s3,
              bucket: process.env.LIARA_BUCKET_NAME,
              acl: 'public-read',
              key: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const fileExtension = extname(file.originalname);
                cb(null, `brand-pictures/${file.fieldname}-${uniqueSuffix}${fileExtension}`);
              },
            }),
          }),
      )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: CreateBrandDTO,
        description: "Body for creating Brand"
    })
    @UsePipes(new ValidationPipe)
    @UseGuards(AdminAuthGuard)
    async createBrand( @Body() createBrandDTO: CreateBrandDTO, @UploadedFiles() brandPicture: S3File[]):Promise<BrandEntity>{

        if (brandPicture) {
            createBrandDTO.image = brandPicture.map(file => file.location)[0];
        }

        return await this.brandService.createBrand(createBrandDTO);
    } 

    @ApiBearerAuth()
    @Put('brand/:id')
    @ApiParam({
        name: 'id',
        required: true,
    })
    @ApiBody({
        type: UpdateBrandDTO,
        description: "Body for updating Brand"
    })
    @UseGuards(AdminAuthGuard)
    async updateBrand(@Param('id') id:number, @Body() updateBrandDTO: UpdateBrandDTO):Promise<BrandEntity>{
        return await this.brandService.updateBrand(+id, updateBrandDTO);
    }

    @ApiBearerAuth()
    @Put('brandavatar/:id')
    @UseInterceptors(
        AnyFilesInterceptor({
            storage: multerS3({
              s3: s3,
              bucket: process.env.LIARA_BUCKET_NAME,
              acl: 'public-read',
              key: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const fileExtension = extname(file.originalname);
                cb(null, `brand-pictures/${file.fieldname}-${uniqueSuffix}${fileExtension}`);
              },
            }),
          }),
      )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: UpdateBrandPhotoDto,
        description: "Body for creating Brand"
    })
    @UsePipes(new ValidationPipe)
    @UseGuards(AdminAuthGuard)
    async updateBrandPhoto( @Param('id') id: string, @Body() UpdateBrandPhotoDto: UpdateBrandPhotoDto, @UploadedFiles() categoryPicture: S3File[]):Promise<BrandEntity>{

        if (categoryPicture) {
            UpdateBrandPhotoDto.image = categoryPicture.map(file => file.location)[0];
        }
        return await this.brandService.updateBrandPhoto(+id, UpdateBrandPhotoDto);
    } 
}
