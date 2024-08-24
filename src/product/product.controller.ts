import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { AdminAuthGuard } from 'src/auth/Guards/auth.admin.guard';
import { ProductEntity } from './product.entity';
import { CreateProductDTO } from './DTO/createProduct.Dto';
import { updateProductDTO } from './DTO/updateProduct.Dto';

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

}
