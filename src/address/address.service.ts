import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddressEntity } from './address.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDTO } from './DTO/createAddress.dto';
import { UserEntity } from 'src/user/user.entity';
import { UpdateAddressDTO } from './DTO/updateAdress.dto';

@Injectable()
export class AddressService {
    constructor(@InjectRepository(AddressEntity) private readonly addressRepository: Repository<AddressEntity>){}
    
    async createAddress(currentUser: UserEntity, createAddressrDTO: CreateAddressDTO): Promise<AddressEntity>{
        const newAddress = this.addressRepository.create();

        Object.assign(newAddress, createAddressrDTO);

        newAddress.user = currentUser;

        return await this.addressRepository.save(newAddress)
    }

    async updateAddress(currentUserId: number, addressId: number, updateAddressDTo: UpdateAddressDTO): Promise<AddressEntity>{
        
        const address = await this.addressRepository.findOne({where: {addressId : addressId}})

        if(address.user.userId !== currentUserId){
            throw new HttpException('not authorized', HttpStatus.UNAUTHORIZED)
        }

        Object.assign(address, updateAddressDTo);

        return await this.addressRepository.save(address);
    }

    async deleteAddress(currentUserId: number, addressId: number): Promise< DeleteResult >{
        const address = await this.addressRepository.findOne({where: {addressId : addressId}})

        if(address.user.userId !== currentUserId){
            throw new HttpException('not authorized', HttpStatus.UNAUTHORIZED)
        }

        return this.addressRepository.delete(address);
    }

    async userAddress(currentUser: UserEntity): Promise<AddressEntity[]>{
        return await this.addressRepository.find({where: {user: currentUser}})
    }
}
