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

    async getOneCategory(slug: string): Promise<CategoryEntity> {
        return this.categoryRepository.findOne({where: {slug: slug } } );
    }

    async createCategory(creatCategoryDTO: CreateCategoryDTO):Promise<CategoryEntity>{
        const categoryByName = await this.categoryRepository.findOne({where: {name : creatCategoryDTO.name} } )

        if(categoryByName){
            throw new HttpException('name is taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        
        const newCatgory= new CategoryEntity();

        Object.assign(newCatgory, creatCategoryDTO);

        newCatgory.slug = this.getSlug(creatCategoryDTO.name)

        return this.categoryRepository.save(newCatgory);
    }

    async updateCategory(slug: string, updateCategoryDTO: UpdateCategoryDTO): Promise<CategoryEntity>{
        const categoryBySlug = await this.categoryRepository.findOne({where: {slug : slug}})

        if(!categoryBySlug){
            throw new HttpException('catgory not found', HttpStatus.UNPROCESSABLE_ENTITY);
        }   

        Object.assign(categoryBySlug, updateCategoryDTO);

        if(updateCategoryDTO.name){
            categoryBySlug.slug = this.getSlug(categoryBySlug.name);
        }

        return this.categoryRepository.save(categoryBySlug);
    }
}
