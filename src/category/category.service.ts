import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './DTO/createCategory.Dto';
import { UpdateCategoryDTO } from './DTO/updateCategory.Dto';
import slugify from 'slugify';
import { UpdateBrandPhotoDto } from 'src/brand/DTO/updateBrandPhoto.Dto';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>){}
    
    private getSlug(name :string): string{
        return (slugify(name , { lower : true}) + '-' + ((Math.random() * Math.pow(36 , 6)) | 0).toString(36));
    }

    async getAllCategory(): Promise<CategoryEntity[]> {
        return this.categoryRepository.find();
    }

    async createCategory(createCategoryDTO: CreateCategoryDTO):Promise<CategoryEntity>{
        const categoryByName = await this.categoryRepository.findOne({where: {name : createCategoryDTO.name} } )

        if(categoryByName){
            throw new HttpException('name is taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        
        const newCategory= new CategoryEntity();

        Object.assign(newCategory, createCategoryDTO);

        const category = await this.categoryRepository.save(newCategory);

        console.info("category created successfully: ", category.id)

        return category;
    }

    async updateCategory(id: number, updateCategoryDTO: UpdateCategoryDTO): Promise<CategoryEntity>{
        const categoryBySlug = await this.categoryRepository.findOne({where: {id : id}})

        if(!categoryBySlug){
            throw new HttpException('category not found', HttpStatus.UNPROCESSABLE_ENTITY);
        }   

        Object.assign(categoryBySlug, updateCategoryDTO);

        const category = await this.categoryRepository.save(categoryBySlug);

        console.info("category updated successfully: ", category.id)
        
        return category
    }

    async getOneCategory(id: number):Promise<CategoryEntity>{
        return await this.categoryRepository.findOne({where: {id: id}})
    }

    async updateCategoryPhoto(id: number, updatePhotoDto: UpdateBrandPhotoDto):Promise<CategoryEntity>{
        const categoryById = await this.categoryRepository.findOne({where: {id : id}})

        if(!categoryById){
            throw new HttpException('category not found', HttpStatus.UNPROCESSABLE_ENTITY);
        }   

        Object.assign(categoryById, updatePhotoDto);

        const category = await this.categoryRepository.save(categoryById);

        console.info("category updated successfully: ", category.id)
        
        return category
    }
}
