import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddressEntity } from './address.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDTO } from './DTO/createAddress.dto';
import { UserEntity } from 'src/user/user.entity';
import { UpdateAddressDTO } from './DTO/updateAdress.dto';
import { UserDto } from 'src/user/DTO/user.Dto';
import { ProviceEntity } from './provice.entity';
import { CityEntity } from './city.entity';

@Injectable()
export class AddressService {
    constructor(@InjectRepository(AddressEntity) private readonly addressRepository: Repository<AddressEntity>,
    @InjectRepository(ProviceEntity) private readonly proviceRepository: Repository<ProviceEntity>,
    @InjectRepository(CityEntity) private readonly cityRepository: Repository<CityEntity>){}
    
    async createAddress(currentUser: UserEntity, createAddressrDTO: CreateAddressDTO): Promise<AddressEntity>{
        const city = await this.cityRepository.findOne({where:{id: createAddressrDTO.city}})

        if(!city){
            throw new HttpException("this city doesnt exist", HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const province = await this.proviceRepository.findOne({where:{id: createAddressrDTO.province}})

        if(!province){
            throw new HttpException("this province doesnt exist", HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const newAddress = this.addressRepository.create();

        Object.assign(newAddress, createAddressrDTO);

        newAddress.user = currentUser;

        newAddress.city = city;

        newAddress.provice = province;

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

    async getProvinces():Promise<ProviceEntity[]>{
        return this.proviceRepository.find();
    }

    async getCityes():Promise<CityEntity[]>{
        const cities  = await this.cityRepository.find();
        //cities.map(city => city.provice = await this.proviceRepository.findOne({where: {id: province}}))

        return cities
    }
}
