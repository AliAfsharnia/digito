import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './DTO/createCategory.Dto';
import { UpdateCategoryDTO } from './DTO/updateCategory.Dto';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>){}
    
    private getSlug(name :string): string{
        return (slugify(name , { lower : true}) + '-' + ((Math.random() * Math.pow(36 , 6)) | 0).toString(36));
    }

    async getAllCategory(): Promise<CategoryEntity[]> {
        return this.categoryRepository.find();
    }

    async createCategory(creatCategoryDTO: CreateCategoryDTO):Promise<CategoryEntity>{
        const categoryByName = await this.categoryRepository.findOne({where: {name : creatCategoryDTO.name} } )

        if(categoryByName){
            throw new HttpException('name is taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        
        const newCatgory= new CategoryEntity();

        Object.assign(newCatgory, creatCategoryDTO);

        const category = await this.categoryRepository.save(newCatgory);

        console.info("category created successfuly: ", category.categoryId)

        return category;
    }

    async updateCategory(id: number, updateCategoryDTO: UpdateCategoryDTO): Promise<CategoryEntity>{
        const categoryBySlug = await this.categoryRepository.findOne({where: {categoryId : id}})

        if(!categoryBySlug){
            throw new HttpException('catgory not found', HttpStatus.UNPROCESSABLE_ENTITY);
        }   

        Object.assign(categoryBySlug, updateCategoryDTO);

        const category = await this.categoryRepository.save(categoryBySlug);

        console.info("category updated successfuly: ", category.categoryId)
        
        return category
    }

    async getOneCategory(id: number):Promise<CategoryEntity>{
        return await this.categoryRepository.findOne({where: {categoryId: id}})
    }
}
