import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from './brand.entity';
import { Repository } from 'typeorm';
import slugify from 'slugify';
import { CreateBrandDTO } from './DTO/createBrand.Dto';
import { UpdateBrandDTO } from './DTO/updateBrand.Dto';

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
        return this.brandRepository.findOne({where: {brandId: id } } );
    }

    async createBrand(creatBrandDTO: CreateBrandDTO):Promise<BrandEntity>{
        const brandByName = await this.brandRepository.findOne({where: {name : creatBrandDTO.name} } )

        if(brandByName){
            throw new HttpException('name is taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        
        const newBrand= new BrandEntity();

        Object.assign(newBrand, creatBrandDTO);

        const brand = await this.brandRepository.save(newBrand);

        console.info("brand created successfuly: ", brand.brandId)

        return brand;
    }

    async updateBrand(id: number, updateBrandDTO: UpdateBrandDTO): Promise<BrandEntity>{
        const brandBySlug = await this.brandRepository.findOne({where: {brandId : id}})

        if(!brandBySlug){
            throw new HttpException('Brand not found', HttpStatus.UNPROCESSABLE_ENTITY);
        }   

        Object.assign(brandBySlug, updateBrandDTO);


        const brand = await this.brandRepository.save(brandBySlug);

        console.info("brand updated successfuly: ", brand.brandId)
        
        return brand
    }
}
