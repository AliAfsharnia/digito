import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { AdminAuthGuard } from 'src/auth/Guards/auth.admin.guard';
import { ProductEntity } from './product.entity';
import { CreateProductDTO } from './DTO/createProduct.Dto';

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
        return this.productService.getProductBySlug(slug);
    }

}
