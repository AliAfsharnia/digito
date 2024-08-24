import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { CreateProductDTO } from './DTO/createProduct.Dto';
import { BrandEntity } from 'src/brand/brand.entity';
import { CategoryEntity } from 'src/category/category.entity';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(BrandEntity) private readonly brandRepository: Repository<BrandEntity>,
    @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>){}

    private getSlug(name :string): string{
        return (slugify(name , { lower : true}) + '-' + ((Math.random() * Math.pow(36 , 6)) | 0).toString(36));
    }

    async createProduct(createProductDTO: CreateProductDTO):Promise<ProductEntity>{

        const brand = await this.brandRepository.findOne({where:{brandId: createProductDTO.brandId}})

        if(!brand){
            throw new HttpException("this brand doesnt exist", HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const category = await this.categoryRepository.findOne({where:{categoryId: createProductDTO.categoryId}})

        if(!category){
            throw new HttpException("this category doesnt exist", HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const newProduct = this.productRepository.create(createProductDTO)

        newProduct.slug = this.getSlug(newProduct.title);

        newProduct.brand = brand;

        newProduct.category = category;
        
        return await this.productRepository.save(newProduct);
    }

    async getProductBySlug(slug: string):Promise<ProductEntity>{
        return this.productRepository.findOne({where:{slug: slug}})
    }
}
