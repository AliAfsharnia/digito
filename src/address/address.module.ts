import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './address.entity';
import { CityEntity } from './city.entity';
import { ProvinceEntity } from './province.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity]), TypeOrmModule.forFeature([CityEntity]), TypeOrmModule.forFeature([ProvinceEntity])],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}
