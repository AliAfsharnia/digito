import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { AdminAuthGuard } from 'src/auth/Guards/auth.admin.guard';
import { ProductEntity } from './product.entity';
import { CreateProductDTO } from './DTO/createProduct.Dto';
import { updateProductDTO } from './DTO/updateProduct.Dto';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { User } from 'src/user/decoratores/user.decorator';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class ProductController {
    constructor(private readonly productService:ProductService){}

    @ApiTags("products")
    @ApiBearerAuth()
    @Post('product')
    @UseInterceptors(AnyFilesInterceptor( {
        storage: diskStorage({
          destination: './uploads/product-pictures', 
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
          },
        })
      }))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: CreateProductDTO,
    })
    @UseGuards(AdminAuthGuard)
    async addProduct(@Body() createProductDTO: CreateProductDTO, @UploadedFiles() profilePictures: Express.Multer.File[]):Promise<ProductEntity>{
        
        if(profilePictures){
            createProductDTO.productImages = profilePictures;
        }

        return await this.productService.createProduct(createProductDTO);
    }

    @ApiTags("products")
    @Get('product/:id')
    async getProductById(@Param('id') id: number): Promise<ProductEntity>{
        return await this.productService.getProductById(+id);
    }

    @ApiTags("products")
    @Put('product/:id')
    async updateProduct(@Param('id') id: number ,@Body() updateProductDTO: updateProductDTO):Promise<ProductEntity>{
        return await this.productService.updateProduct(id, updateProductDTO);
    }

    @ApiTags("favorites")
    @ApiBearerAuth()
    @Post('product/:id/favorite')
    @UseGuards(AuthGuard)
    async likingProduct(@User('userId') currentUserId: number, @Param('id') id: number ): Promise<ProductEntity>{ 
        return  this.productService.likingProduct(currentUserId, +id);
    }

    @ApiTags("favorites")
    @ApiBearerAuth()
    @Delete('product/:id/favorite')
    @UseGuards(AuthGuard)
    async disLikingProduct(@User('userId') currentUserId: number, @Param('id') id: number ): Promise<ProductEntity>{ 
        return  this.productService.disLikingProduct(currentUserId, +id);
    }

    @ApiTags("products")
    @Get('products')
    async findAll(): Promise<ProductEntity[]>{

        const products = await this.productService.findAll();
        return products;
    }

    /*@Get()
    async findAll(@User('userId') currentUserId: number, @Query() query: any): Promise<{products: ProductEntity[], productsCount: number}>{
        return this.productService.findAll(currentUserId, query);
    }*/
    
    @ApiTags('favorites')
    @ApiBearerAuth()
    @Get('user/favorites')
    @UseGuards(AuthGuard)
    async userFav(@User('userId') currentUserId: number):Promise<ProductEntity[]>{
        return await this.productService.userFav(currentUserId);
    }        
}

