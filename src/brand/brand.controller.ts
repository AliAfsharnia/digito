import { Get, Body, Controller, Post, Put, UseGuards, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { BrandService } from './brand.service';
import { CreateBrandDTO } from './DTO/createBrand.Dto';
import { BrandEntity } from './brand.entity';
import { AdminAuthGuard } from 'src/auth/Guards/auth.admin.guard';
import { UpdateBrandDTO } from './DTO/updateBrand.Dto';

@ApiTags("brands")
@Controller('brand')
export class BrandController {
    constructor(private readonly brandService: BrandService){}

    @Get('all')
    async getAllCategory():Promise<BrandEntity[]>{
        return this.brandService.getAllBrand();
    }

    @Get(':slug')
    async getOneCategory(@Param('slug') slug: string):Promise<BrandEntity>{
        return this.brandService.getOneBrand(slug);
    }

    @ApiBearerAuth()
    @Post()
    @ApiBody({
        type: CreateBrandDTO,
        description: "Body for creating Brand"
    })
    @UsePipes(new ValidationPipe)
    @UseGuards(AdminAuthGuard)
    async createBrand( @Body() creatBrandDTO: CreateBrandDTO):Promise<BrandEntity>{
        return await this.brandService.createBrand(creatBrandDTO);
    } 

    @ApiBearerAuth()
    @Put(':slug')
    @ApiParam({
        name: 'slug',
        required: true,
    })
    @ApiBody({
        type: UpdateBrandDTO,
        description: "Body for updating Brand"
    })
    @UseGuards(AdminAuthGuard)
    async updateBrand(@Param('slug') slug:string, @Body() updateBrandDTO: UpdateBrandDTO):Promise<BrandEntity>{
        return await this.brandService.updateBrand(slug, updateBrandDTO);
    }

}
