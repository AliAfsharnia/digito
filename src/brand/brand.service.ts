import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from './brand.entity';
import { Repository } from 'typeorm';
import slugify from 'slugify';
import { CreateBrandDTO } from './DTO/createBrand.Dto';
import { UpdateBrandDTO } from './DTO/updateBrand.Dto';
import { UpdateBrandPhotoDto } from './DTO/updateBrandPhoto.Dto';
import { Massages } from 'src/massages/massages';

@Injectable()
export class BrandService {
    constructor(@InjectRepository(BrandEntity) private readonly brandRepository: Repository<BrandEntity>){}
    
    private getSlug(name :string): string{
        return (slugify(name , { lower : true}) + '-' + ((Math.random() * Math.pow(36 , 6)) | 0).toString(36));
    }

    async getAllBrand(): Promise<BrandEntity[]> {
        return this.brandRepository.find();
    }

    async getOneBrand(id: number): Promise<BrandEntity> {
        return this.brandRepository.findOne({where: {id: id } } );
    }

    async createBrand(createBrandDTO: CreateBrandDTO):Promise<BrandEntity>{
        const brandByName = await this.brandRepository.findOne({where: {name : createBrandDTO.name} } )

        if(brandByName){
            throw new HttpException(Massages.NAME_TAKEN, HttpStatus.UNPROCESSABLE_ENTITY);
        }
        
        const newBrand= new BrandEntity();

        Object.assign(newBrand, createBrandDTO);

        const brand = await this.brandRepository.save(newBrand);

        console.info(Massages.BRAND_CREATED, brand.id)

        return brand;
    }

    async updateBrand(id: number, updateBrandDTO: UpdateBrandDTO): Promise<BrandEntity>{
        const brandBySlug = await this.brandRepository.findOne({where: {id : id}})

        if(!brandBySlug){
            throw new HttpException(Massages.BRAND_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
        }   

        Object.assign(brandBySlug, updateBrandDTO);


        const brand = await this.brandRepository.save(brandBySlug);

        console.info(Massages.BRAND_UPDATED, brand.id)
        
        return brand
    }

    async updateBrandPhoto(id: number, updatePhotoDto: UpdateBrandPhotoDto):Promise<BrandEntity>{
        const brandById = await this.brandRepository.findOne({where: {id : id}})

        if(!brandById){
            throw new HttpException(Massages.BRAND_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
        }   

        Object.assign(brandById, updatePhotoDto);

        const brand = await this.brandRepository.save(brandById);

        console.info(Massages.BRAND_UPDATED, brand.id)
        
        return brand
    }
}
