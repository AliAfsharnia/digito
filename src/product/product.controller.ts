import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { AdminAuthGuard } from 'src/auth/Guards/auth.admin.guard';
import { ProductEntity } from './product.entity';
import { CreateProductDTO } from './DTO/createProduct.Dto';
import { updateProductDTO } from './DTO/updateProduct.Dto';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { User } from 'src/user/decorators/user.decorator';
import { extname } from 'path';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { s3 } from 'src/s3.config';
import * as multerS3 from 'multer-s3';
import { CreateAttributeDto } from './DTO/createAttribute.Dto';
import { AttributesEntity } from './attributes.entity';
import { UpdateAttributeDTO } from './DTO/updateAttribute.Dto';
import { Binary, DeleteResult } from 'typeorm';
import { AddPhotosDTO } from './DTO/addPhoto.dto';

@Controller()
export class ProductController {
    constructor(private readonly productService:ProductService,){}

    @ApiTags("products")
    @ApiBearerAuth()
    @Post('product')
    @UseInterceptors(
        AnyFilesInterceptor({
          storage: multerS3({
            s3: s3,
            bucket: process.env.LIARA_BUCKET_NAME,
            acl: 'public-read',
            key: (req, file, cb) => {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
              const fileExtension = extname(file.originalname);
              cb(null, `product-pictures/${file.fieldname}-${uniqueSuffix}${fileExtension}`);
            },
          }),
        }),
      )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: CreateProductDTO,
    })
    @UseGuards(AdminAuthGuard)
    @UsePipes(new ValidationPipe)
    async addProduct(@Body() createProductDTO: CreateProductDTO, @UploadedFiles() productImages: S3File[]):Promise<ProductEntity>{
        
      const product = await this.productService.createProduct(createProductDTO);

      if (productImages && productImages.length > 0) {
        for(let file of productImages){
          await this.productService.addPhotoForProduct(product, file.location)
        }
      }

      return await this.productService.getProductById(product.id) 
    }

    @ApiTags("products")
    @ApiBearerAuth()
    @Post('product/Photo/:productID')
    @UseInterceptors(
        AnyFilesInterceptor({
          storage: multerS3({
            s3: s3,
            bucket: process.env.LIARA_BUCKET_NAME,
            acl: 'public-read',
            key: (req, file, cb) => {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
              const fileExtension = extname(file.originalname);
              cb(null, `product-pictures/${file.fieldname}-${uniqueSuffix}${fileExtension}`);
            },
          }),
        }),
      )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: AddPhotosDTO,
    })
    @UseGuards(AdminAuthGuard)
    @UsePipes(new ValidationPipe)
    async addPhotoToProduct(@Param('productID') id: number, @UploadedFiles() productImages: S3File[]):Promise<ProductEntity>{
      const product = await this.productService.getProductById(id);
      console.log('2')
      if (productImages && productImages.length > 0) {
        for(let file of productImages){
          await this.productService.addPhotoForProduct(product, file.location)
        }
      }

      return await this.productService.getProductById(product.id) 
    }

    @ApiTags("products")
    @Delete('product/Photo/:photoId')
    @ApiBearerAuth()
    @UseGuards(AdminAuthGuard)
    @UsePipes(new ValidationPipe)
    async deletePhotoFromProduct( @Param('photoId') id: number):Promise<DeleteResult>{
        return await this.productService.deletePhotoFromProduct(id);
    }

    @ApiTags("attributes")
    @Post(':productId/attributes')
    @ApiBearerAuth()
    @ApiBody({
      type: CreateAttributeDto,
    })
    @UseGuards(AdminAuthGuard)
    @UsePipes(new ValidationPipe)
    async addAttributes(@Body() createAttributesDto: CreateAttributeDto, @Param('productId') id: number):Promise<AttributesEntity>{
        return await this.productService.addAttribute(id, createAttributesDto);
    }

    @ApiTags("attributes")
    @Put('attributes/:attributesId')
    @ApiBearerAuth()
    @ApiBody({
      type: UpdateAttributeDTO,
    })
    @UseGuards(AdminAuthGuard)
    @UsePipes(new ValidationPipe)
    async updateAttributes(@Body() updateAttributesDto: UpdateAttributeDTO, @Param('attributesId') id: number):Promise<AttributesEntity>{
        return await this.productService.updateAttribute(id, updateAttributesDto);
    }

    @ApiTags("attributes")
    @Delete('attributes/:attributesId')
    @ApiBearerAuth()
    @UseGuards(AdminAuthGuard)
    @UsePipes(new ValidationPipe)
    async deleteAttribute( @Param('attributesId') id: number):Promise<DeleteResult>{
        return await this.productService.deleteAttribute(id);
    }


    @ApiTags("products")
    @Get('product/:id')
    async getProductById(@Param('id') id: number): Promise<ProductEntity>{
        return await this.productService.getProductById(+id);
    }

    @ApiTags("products")
    @ApiBody({
      type: updateProductDTO,
    })
    @UsePipes(new ValidationPipe)
    @Put('product/:id')
    async updateProduct(@Param('id') id: number ,@Body() updateProductDTO: updateProductDTO):Promise<ProductEntity>{
        return await this.productService.updateProduct(id, updateProductDTO);
    }

    @ApiTags("favorites")
    @ApiBearerAuth()
    @Post('product/:id/favorite')
    @UseGuards(AuthGuard)
    async likingProduct(@User('id') currentid: number, @Param('id') id: number ): Promise<ProductEntity>{ 
        return  this.productService.likingProduct(currentid, +id);
    }

    @ApiTags("favorites")
    @ApiBearerAuth()
    @Delete('product/:id/favorite')
    @UseGuards(AuthGuard)
    async disLikingProduct(@User('id') currentid: number, @Param('id') id: number ): Promise<ProductEntity>{ 
        return  this.productService.disLikingProduct(currentid, +id);
    }

    @ApiTags("products")
    @Get('products')
    @ApiQuery({ name: 'brand' , required: false})
    @ApiQuery({ name: 'category', required: false })
    async findAll(@Query() query: any): Promise<ProductEntity[]>{
        const products = await this.productService.findAll(query);
        return products;
    }
    
    @ApiTags('favorites')
    @ApiBearerAuth()
    @Get('user/favorites')
    @UseGuards(AuthGuard)
    async userFav(@User('id') currentid: number):Promise<ProductEntity[]>{
        return await this.productService.userFav(currentid);
    }
}