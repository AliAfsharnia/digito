import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { DataSource, DeleteResult, In, Repository, getConnection } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CreateProductDTO } from './DTO/createProduct.Dto';
import { BrandEntity } from 'src/brand/brand.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { updateProductDTO } from './DTO/updateProduct.Dto';
import { UserEntity } from 'src/user/user.entity';
import { CreateAttributeDto } from './DTO/createAttribute.Dto';
import { AttributesEntity } from './attributes.entity';
import { UpdateAttributeDTO } from './DTO/updateAttribute.Dto';
import { ProductPhotoEntity } from './ProductPhotos.entity';
import { Massages } from 'src/massages/massages';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(BrandEntity) private readonly brandRepository: Repository<BrandEntity>,
    @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AttributesEntity) private readonly attributesRepository: Repository<AttributesEntity>,
    @InjectRepository(ProductPhotoEntity) private readonly productPhotoRepository: Repository<ProductPhotoEntity>,@InjectDataSource() private dataSource:DataSource,){}

    async createProduct(createProductDTO: CreateProductDTO):Promise<ProductEntity>{

        const brand = await this.brandRepository.findOne({where:{id: createProductDTO.brandId}})

        if(!brand){
            throw new HttpException(Massages.BRAND_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const category = await this.categoryRepository.findOne({where:{id: createProductDTO.categoryId}})

        if(!category){
            throw new HttpException(Massages.CATEGORY_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const newProduct = this.productRepository.create()

        newProduct.brand = brand;

        newProduct.category = category;

        delete createProductDTO.images

        Object.assign(newProduct, createProductDTO)

        const result = await this.productRepository.save(newProduct);

        console.info(Massages.PRODUCT_CREATED, result.id)

        return result;
    }

    async addPhotoForProduct(product: ProductEntity, image: string):Promise<void>{
        const photo = this.productPhotoRepository.create()
        photo.product = product
        photo.image = image;
        const result = await this.productPhotoRepository.save(photo);
        console.info(Massages.PRODUCT_PHOTO_UPDATED, result.id)
    }

    async deletePhotoFromProduct(id: number):Promise<DeleteResult>{
        const image = await this.productPhotoRepository.findOne({where:{id: id}})

        if(!image){
            throw new HttpException(Massages.PRODUCT_PHOTO_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const result = await this.productPhotoRepository.delete(image);
        console.info(Massages.PRODUCT_PHOTO_DELETED, id)

        return result;
    }

    async getProductById(id: number):Promise<ProductEntity>{
        return this.productRepository.findOne({where:{id: id}, relations: ['attributes', 'images']})
    }

    async updateProduct(id: number, updateProductDTO: updateProductDTO):Promise<ProductEntity>{
        const product = await this.productRepository.findOne({where:{id :id}, relations: ['attributes', 'images']})

        Object.assign(product, updateProductDTO);
    
        if(updateProductDTO.BrandId){
            product.brand = await this.brandRepository.findOne({where:{id: updateProductDTO.BrandId}});
        }

        if(updateProductDTO.CategoryId){
            product.category = await this.categoryRepository.findOne({where:{id: updateProductDTO.CategoryId}});
        }

        const result = await this.productRepository.save(product);

        console.info(Massages.PRODUCT_UPDATED, result.id)

        return result;
    }

    async likingProduct(UserId: number, id: number):Promise<ProductEntity>{
        const product = await this.getProductById(id);
        const user = await this.userRepository.findOne({where: {id: UserId}, relations: ['favorites', 'images']});
    
        const isNotFavorite = user.favorites.findIndex((productsInFavorites) => productsInFavorites.id === product.id) === -1;
    
        if(isNotFavorite){
            user.favorites.push(product);
            product.favoritesCount++;
    
            await this.productRepository.save(product);
            await this.userRepository.save(user)
        }    
        
        console.info(Massages.PRODUCT_ADDED_TO_FAVORITES, user.id)
        console.info(Massages.PRODUCT_FAVORITES_INCREASED, product.id)

        return product;
    }
    
    async disLikingProduct(UserId: number, id: number):Promise<ProductEntity>{
        const product = await this.getProductById(id);
        const user = await this.userRepository.findOne({where: {id: UserId}, relations: ['favorites', 'images']});
    
        const productIndex = user.favorites.findIndex((productsInFavorites) => productsInFavorites.id === product.id);
    
        if(productIndex >= 0){
            user.favorites.splice(productIndex, 1);
            product.favoritesCount--;
    
            await this.productRepository.save(product);
            await this.userRepository.save(user)
        }   
    
        console.info(Massages.PRODUCT_REMOVED_FROM_FAVORITES, user.id)
        console.info(Massages.PRODUCT_FAVORITES_DECREASED, product.id)

        return product;
    }

    async findAll(query: any):Promise<ProductEntity[]>{

        if(query.brand && query.category){

            const brand = await this.brandRepository.findOne({where:{id: query.brand}})

            if(!brand){
                throw new HttpException(Massages.BRAND_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY)
            }

            const category = await this.categoryRepository.findOne({where: {id: query.category}})

            if(!category){
                throw new HttpException(Massages.CATEGORY_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY)
            }

            return this.productRepository.find({where: {category: category, brand: brand}, relations: ['attributes', 'images']})
        }

        if(query.brand){

            const brand = await this.brandRepository.findOne({where:{id: query.brand}})

            if(!brand){
                throw new HttpException(Massages.BRAND_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY)
            }


            return this.productRepository.find({where: {brand: brand}, relations: ['attributes', 'images']})
        }

        if(query.category){

            const category = await this.categoryRepository.findOne({where: {id: query.category}})

            if(!category){
                throw new HttpException(Massages.CATEGORY_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY)
            }

            return this.productRepository.find({where: {category: category}, relations: ['attributes', 'images']})
        }

        return await this.productRepository.find({relations: ['attributes', 'images']});
    }

    async userFav(currentid: number):Promise<ProductEntity[]>{
        const rawResult = await this.dataSource
        .createQueryBuilder()
        .select('"productsid"')
        .from('users_favorites_products', 'users_favorites_products')
        .where('users_favorites_products."usersid" = :id', { id: Number(currentid) }).getRawMany()
        ;

        const ids = rawResult.map(item => item.productsid);

        const products = await this.productRepository.find({where:{id: In(ids)}})

       return products;
    }

    async addAttribute(id: number, createAttributesDto: CreateAttributeDto):Promise<AttributesEntity>{
        const product = await this.productRepository.findOne({where:{id: id}, relations: ['attributes', 'images']})

        if(!product){
            throw new HttpException(Massages.PRODUCT_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const newAttr = this.attributesRepository.create();
        newAttr.product = product;
        Object.assign(newAttr, createAttributesDto)

        const result = await this.attributesRepository.save(newAttr);

        console.info(Massages.ATTRIBUTE_CREATED, product.id)

        return result;
    }

    async updateAttribute(id: number, updateAttributesDto: UpdateAttributeDTO):Promise<AttributesEntity>{
        const attr = await this.attributesRepository.findOne({where:{id: id}})

        if(!attr){
            throw new HttpException(Massages.ATTRIBUTE_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY)
        }

        Object.assign(attr, updateAttributesDto)

        const result = await this.attributesRepository.save(attr);

        console.info(Massages.ATTRIBUTE_UPDATED, attr.id)

        return result;
    }

    async deleteAttribute(id: number):Promise<DeleteResult>{
        const attr = await this.attributesRepository.findOne({where:{id: id}})

        if(!attr){
            throw new HttpException(Massages.ATTRIBUTE_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const result = await this.attributesRepository.delete(attr);

        console.info(Massages.ATTRIBUTE_DELETED, attr.id)

        return result;
    }
}
