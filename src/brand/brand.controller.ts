import { Get, Body, Controller, Post, Put, UseGuards, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { BrandService } from './brand.service';
import { CreateBrandDTO } from './DTO/createBrand.Dto';
import { BrandEntity } from './brand.entity';
import { AdminAuthGuard } from 'src/auth/Guards/auth.admin.guard';
import { UpdateBrandDTO } from './DTO/updateBrand.Dto';

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
    @ApiBody({
        type: CreateBrandDTO,
        description: "Body for creating Brand"
    })
    @UsePipes(new ValidationPipe)
    @UseGuards(AdminAuthGuard)
    async createBrand( @Body() createBrandDTO: CreateBrandDTO):Promise<BrandEntity>{
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

}
