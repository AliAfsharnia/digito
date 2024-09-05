import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './address.entity';
import { CityEntity } from './city.entity';
import { ProviceEntity } from './provice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity]), TypeOrmModule.forFeature([CityEntity]), TypeOrmModule.forFeature([ProviceEntity])],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}
