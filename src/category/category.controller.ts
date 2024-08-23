import { Get, Body, Controller, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDTO } from './DTO/createCategory.Dto';
import { AdminAuthGuard } from 'src/auth/Guards/auth.admin.guard';
import { CategoryEntity } from './category.entity';
import { UpdateCategoryDTO } from './DTO/updateCategory.Dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService){}

    @Get('all')
    async getAllCategory():Promise<CategoryEntity[]>{
        return this.categoryService.getAllCategory();
    }

    @Get(':slug')
    async getOneCategory(@Param('slug') slug: string):Promise<CategoryEntity>{
        return this.categoryService.getOneCategory(slug);
    }

    @ApiBearerAuth()
    @Post()
    @ApiBody({
        type: CreateCategoryDTO,
        description: "Body for creating Category"
    })
    @UsePipes(new ValidationPipe)
    @UseGuards(AdminAuthGuard)
    async createCategory( @Body() creatCategoryDTO: CreateCategoryDTO):Promise<CategoryEntity>{
        return await this.categoryService.createCategory(creatCategoryDTO);
    } 

    @ApiBearerAuth()
    @Put(':slug')
    @ApiParam({
        name: 'slug',
        required: true,
    })
    @ApiBody({
        type: UpdateCategoryDTO,
        description: "Body for updating Category" 
    })
    @UseGuards(AdminAuthGuard)
    async updateCategory(@Param('slug') slug, @Body() updateCategoryDTO: UpdateCategoryDTO):Promise<CategoryEntity>{
        return await this.categoryService.updateCategory(slug ,updateCategoryDTO);
    }
}
