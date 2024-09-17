import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddressEntity } from './address.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDTO } from './DTO/createAddress.dto';
import { UserEntity } from 'src/user/user.entity';
import { UpdateAddressDTO } from './DTO/updateAddress.dto';
import { UserDto } from 'src/user/DTO/user.Dto';
import { ProvinceEntity } from './province.entity';
import { CityEntity } from './city.entity';

@Injectable()
export class AddressService {
    constructor(@InjectRepository(AddressEntity) private readonly addressRepository: Repository<AddressEntity>,
    @InjectRepository(ProvinceEntity) private readonly provinceRepository: Repository<ProvinceEntity>,
    @InjectRepository(CityEntity) private readonly cityRepository: Repository<CityEntity>){}
    
    async createAddress(currentUser: UserEntity, createAddressDTO: CreateAddressDTO): Promise<AddressEntity>{
        const city = await this.cityRepository.findOne({where:{id: createAddressDTO.city}})

        if(!city){
            throw new HttpException("this city doesn't exist", HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const province = await this.provinceRepository.findOne({where:{id: createAddressDTO.province}})

        if(!province){
            throw new HttpException("this province doesn't exist", HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const newAddress = this.addressRepository.create();

        Object.assign(newAddress, createAddressDTO);

        newAddress.user = currentUser;

        newAddress.city = city;

        newAddress.province = province;

        const address = await this.addressRepository.save(newAddress)

        console.info("address created successfully: ", address.addressId)

        return address
    }

    async updateAddress(currentUserId: number, addressId: number, updateAddressDTo: UpdateAddressDTO): Promise<AddressEntity>{
        
        const address = await this.addressRepository.findOne({where: {addressId : addressId}})

        if(address.user.userId !== currentUserId){
            throw new HttpException('not authorized', HttpStatus.UNAUTHORIZED)
        }

        Object.assign(address, updateAddressDTo);

        const result = await this.addressRepository.save(address);

        console.info("address updated successfully: ", address.addressId)

        return result;
    }

    async deleteAddress(currentUserId: number, addressId: number): Promise< DeleteResult >{
        const address = await this.addressRepository.findOne({where: {addressId : addressId}})

        if(address.user.userId !== currentUserId){
            throw new HttpException('not authorized', HttpStatus.UNAUTHORIZED)
        }

        const result = this.addressRepository.delete(address);

        console.info("address deleted successfully: ", address.addressId)

        return result;
    }

    async userAddress(currentUser: UserDto): Promise<AddressEntity[]>{
        return await this.addressRepository.find({where: {user: currentUser}})
    }

    async getProvinces():Promise<ProvinceEntity[]>{
        return this.provinceRepository.find();
    }

    async getCites():Promise<CityEntity[]>{
        const cities  = await this.cityRepository.find();
        return cities
    }
}
