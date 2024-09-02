import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { AdminAuthGuard } from 'src/auth/Guards/auth.admin.guard';
import { ProductEntity } from './product.entity';
import { CreateProductDTO } from './DTO/createProduct.Dto';
import { updateProductDTO } from './DTO/updateProduct.Dto';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { User } from 'src/user/decoratores/user.decorator';
import { UserEntity } from 'src/user/user.entity';


@Controller()
export class ProductController {
    constructor(private readonly productService:ProductService){}

    @ApiTags("products")
    @ApiBearerAuth()
    @Post('product/add')
    @ApiBody({
        type: CreateProductDTO,
        description: 'Json structure for user object',
        isArray: true,
    })
    @UseGuards(AdminAuthGuard)
    async addProduct(@Body() createProductDTO: CreateProductDTO[]):Promise<ProductEntity[]>{
        const products = await Promise.all(
            createProductDTO.map(createProductDTO => 
                this.productService.createProduct(createProductDTO)
            )
        );
    
        return products;
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

    @ApiTags("products")
    @ApiBearerAuth()
    @Post('product/:id/favorite')
    @UseGuards(AuthGuard)
    async likingProduct(@User('userId') currentUserId: number, @Param('id') id: number ): Promise<ProductEntity>{ 
        return  this.productService.likingProduct(currentUserId, +id);
    }

    @ApiTags("products")
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
    
    @ApiTags('users')
    @ApiBearerAuth()
    @Get('user/favorites')
    @UseGuards(AuthGuard)
    async userFav(@User('userId') currentUserId: number):Promise<ProductEntity[]>{
        return await this.productService.userFav(currentUserId);
    }        
}
