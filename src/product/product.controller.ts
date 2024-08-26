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

@ApiTags("products")
@Controller('product')
export class ProductController {
    constructor(private readonly productService:ProductService){}

    @ApiBearerAuth()
    @Post('add')
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

    @Get(':slug')
    async getProductBySlug(@Param('slug') slug: string): Promise<ProductEntity>{
        return await this.productService.getProductBySlug(slug);
    }

    @Put(':slug')
    async updateProduct(@Param('slug') slug:string ,@Body() updateProductDTO: updateProductDTO):Promise<ProductEntity>{
        return await this.productService.updateProduct(slug, updateProductDTO);
    }

    @ApiBearerAuth()
    @Post(':slug/favorite')
    @UseGuards(AuthGuard)
    async likingProduct(@User('userId') currentUserId: number, @Param('slug') slug: string ): Promise<ProductEntity>{ 
        return  this.productService.likingProduct(currentUserId, slug);
    }

    @ApiBearerAuth()
    @Delete(':slug/favorite')
    @UseGuards(AuthGuard)
    async disLikingProduct(@User('userId') currentUserId: number, @Param('slug') slug: string ): Promise<ProductEntity>{ 
        return  this.productService.disLikingProduct(currentUserId, slug);
    }

    @Get()
    async findAll(@User('userId') currentUserId: number, @Query() query: any): Promise<{products: ProductEntity[], productsCount: number}>{
        return this.productService.findAll(currentUserId, query);
    }
    
    @ApiBearerAuth()
    @Get('user/fav')
    @UseGuards(AuthGuard)
    async userFav(@User('userId') currentUserId: number):Promise<ProductEntity[]>{
        return await this.productService.userFav(currentUserId);
    }
}
