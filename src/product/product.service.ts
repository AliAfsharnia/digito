import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { DataSource, In, Repository, getConnection } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { CreateProductDTO } from './DTO/createProduct.Dto';
import { BrandEntity } from 'src/brand/brand.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { updateProductDTO } from './DTO/updateProduct.Dto';
import { UserEntity } from 'src/user/user.entity';
import { ALL } from 'dns';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(BrandEntity) private readonly brandRepository: Repository<BrandEntity>,
    @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,@InjectDataSource() private dataSourse:DataSource){}

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

        newProduct.brand = brand;

        newProduct.category = category;

        if(createProductDTO.productImages){
            const productsImages = await Promise.all(
                createProductDTO.productImages.map(profilePicture => 
                    this.uploadFile(profilePicture)
                )
            );
            newProduct.images = productsImages;
        }
        
        return await this.productRepository.save(newProduct);
    }

    async getProductById(id: number):Promise<ProductEntity>{
        return this.productRepository.findOne({where:{productId: id}})
    }

    async updateProduct(id: number, updateProductDTO: updateProductDTO):Promise<ProductEntity>{
        const product = await this.productRepository.findOne({where:{productId :id}})

        Object.assign(product, updateProductDTO);
    
        if(updateProductDTO.brandId){
            product.brand = await this.brandRepository.findOne({where:{brandId: updateProductDTO.brandId}});
        }

        if(updateProductDTO.categoryId){
            product.category = await this.categoryRepository.findOne({where:{categoryId: updateProductDTO.categoryId}});
        }

        return await this.productRepository.save(product);
    }

    async likingProduct(userId: number, id: number):Promise<ProductEntity>{
        const product = await this.getProductById(id);
        const user = await this.userRepository.findOne({where: {userId: userId}, relations: ['favorites']});
    
        const isNotFavorite = user.favorites.findIndex((productsInFavorites) => productsInFavorites.productId === product.productId) === -1;
    
        if(isNotFavorite){
            user.favorites.push(product);
            product.favoritesCount++;
    
            await this.productRepository.save(product);
            await this.userRepository.save(user)
        }    
                                             
        return product;
    }
    
    async disLikingProduct(userId: number, id: number):Promise<ProductEntity>{
        const product = await this.getProductById(id);
        const user = await this.userRepository.findOne({where: {userId: userId}, relations: ['favorites']});
    
        const productIndex = user.favorites.findIndex((productsInFavorites) => productsInFavorites.productId === product.productId);
    
        if(productIndex >= 0){
            user.favorites.splice(productIndex, 1);
            product.favoritesCount--;
    
            await this.productRepository.save(product);
            await this.userRepository.save(user)
        }   
    
        return product;
    }

    async findAll():Promise<ProductEntity[]>{
        return await this.productRepository.find();
    }

    async findAllFillter(currentUserId: number, query: any):Promise<{products: ProductEntity[], productsCount: number}>{
        const queryBuilder = this.dataSourse.getRepository(ProductEntity).createQueryBuilder('products').leftJoinAndSelect('products.brand', 'brand').leftJoinAndSelect('products.category', 'catgory');
    
        queryBuilder.orderBy('product.price', 'DESC')
        
        if(query.tag){
            queryBuilder.andWhere("articles.tagList LIKE :tag", {
                tag: `%${query.tag}%`,
            })
        }
    
        if(query.brand){
            const brand = await this.brandRepository.findOne({where:{name : query.name}})
            queryBuilder.andWhere("products.brand = :brand", {
                brand: brand.name,
            })
        }
        
        if(query.category){
            const category = await this.categoryRepository.findOne({where:{name : query.name}})
            queryBuilder.andWhere("products.category = :category", {
                brand: category.name,
            })
        }

        const productsCount = await queryBuilder.getCount();
    
        if(query.offset){
            queryBuilder.offset(query.offset)
        }
        
        if(query.limit){
            queryBuilder.limit(query.limit)
        }
    
        const products = await queryBuilder.getMany();
    
        return {products, productsCount};
    }
    
    async userFav(currentUserId: number):Promise<ProductEntity[]>{
        const rawResult = await this.dataSourse
        .createQueryBuilder()
        .select('"productsProductId"')
        .from('users_favorites_products', 'users_favorites_products')
        .where('users_favorites_products."usersUserId" = :id', { id: Number(currentUserId) }).getRawMany()
        ;

        const productIds = rawResult.map(item => item.productsProductId);

        const products = await this.productRepository.find({where:{productId: In(productIds)}})

       return products;
    }

    async uploadFile(file: Express.Multer.File): Promise<string> {
        const filePath = `/uploads/product-pictures/${file.filename}`;
        
        const fileUrl = `${process.env.BASE_URL}${filePath}`;

        return  fileUrl;
    }
}
