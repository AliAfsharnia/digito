import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe, Put, Param, Delete, Get } from '@nestjs/common';
import { AddressService } from './address.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateAddressDTO } from './DTO/createAddress.dto';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { AddressEntity } from './address.entity';
import { UpdateAddressDTO } from './DTO/updateAddress.dto';
import { DeleteResult } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { UserDto } from 'src/user/DTO/user.Dto';
import { CityEntity } from './city.entity';
import { ProvinceEntity } from './province.entity';
import { User } from 'src/user/decorators/user.decorator';

@ApiTags("address")
@Controller()
export class AddressController {
    constructor( private readonly addressService: AddressService){}

    @ApiBearerAuth()
    @Post("users/address")
    @ApiBody({
        
        type: CreateAddressDTO,
        description: "Body for creating Address"
    })
    @UsePipes(new ValidationPipe)
    @UseGuards(AuthGuard)
    async createAddress(@User() currentUser: UserEntity, @Body() createAddressDTO: CreateAddressDTO):Promise<AddressEntity>{
        return await this.addressService.createAddress(currentUser, createAddressDTO);
    } 

    @ApiBearerAuth()
    @Put("users/address/:id")
    @ApiParam({
        name: 'id',
        required: true,
    })
    @ApiBody({
        type: UpdateAddressDTO,
        description: "Body for updating Address"
    })
    @UsePipes(new ValidationPipe)
    @UseGuards(AuthGuard)
    async updateAddress(@User('userId') currentUser: number, @Param('id') addressId, @Body() updateAddressDTO: UpdateAddressDTO):Promise<AddressEntity>{
        return await this.addressService.updateAddress(currentUser, +addressId, updateAddressDTO);
    } 

    @ApiBearerAuth()
    @Delete("users/address/:id")
    @ApiParam({
        name: 'id',
        required: true,
    })
    @UsePipes(new ValidationPipe)
    @UseGuards(AuthGuard)
    async deleteAddress(@User('userId') currentUser: number, @Param('id') addressId):Promise<DeleteResult>{
        return await this.addressService.deleteAddress(currentUser, +addressId);
    } 

    @ApiBearerAuth()
    @Get("users/addresses")
    @UsePipes(new ValidationPipe)
    @UseGuards(AuthGuard)
    async userAddress(@User() currentUser: UserDto):Promise<AddressEntity[]>{
        return await this.addressService.userAddress(currentUser);
    } 

    @Get("cites")
    async getCityes(): Promise<CityEntity[]>{
        return this.addressService.getCites();
    }

    @Get("provinces")
    async getProvinces(): Promise<ProvinceEntity[]>{
        return this.addressService.getProvinces();
    }
}


