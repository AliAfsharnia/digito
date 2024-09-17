import { Get, Body, Controller, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDTO } from './DTO/createCategory.Dto';
import { AdminAuthGuard } from 'src/auth/Guards/auth.admin.guard';
import { CategoryEntity } from './category.entity';
import { UpdateCategoryDTO } from './DTO/updateCategory.Dto';

@ApiTags('category')
@Controller()
export class CategoryController {

    constructor(private readonly categoryService: CategoryService){}

    @Get('category')
    async getAllCategory():Promise<CategoryEntity[]>{
        return this.categoryService.getAllCategory();
    }

    @Get('category/:id')
    async getOneCategory(@Param('id') id: string):Promise<CategoryEntity>{
        return this.categoryService.getOneCategory(+id);
    }

    @ApiBearerAuth()
    @Post('category')
    @ApiBody({
        type: CreateCategoryDTO,
        description: "Body for creating Category"
    })
    @UsePipes(new ValidationPipe)
    @UseGuards(AdminAuthGuard)
    async createCategory( @Body() createCategoryDTO: CreateCategoryDTO):Promise<CategoryEntity>{
        return await this.categoryService.createCategory(createCategoryDTO);
    } 

    @ApiBearerAuth()
    @Put('category/:id')
    @ApiParam({
        name: 'id',
        required: true,
    })
    @ApiBody({
        type: UpdateCategoryDTO,
        description: "Body for updating Category" 
    })
    @UseGuards(AdminAuthGuard)
    async updateCategory(@Param('id') id: string, @Body() updateCategoryDTO: UpdateCategoryDTO):Promise<CategoryEntity>{
        return await this.categoryService.updateCategory(+id ,updateCategoryDTO);
    }
}
