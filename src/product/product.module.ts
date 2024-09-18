import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { BrandEntity } from 'src/brand/brand.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { UserEntity } from 'src/user/user.entity';
import { AttributesEntity } from './attributes.entity';
import { ProductPhotoEntity } from './ProductPhotos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPhotoEntity]), TypeOrmModule.forFeature([AttributesEntity]), TypeOrmModule.forFeature([UserEntity]), TypeOrmModule.forFeature([ProductEntity]), TypeOrmModule.forFeature([BrandEntity]), TypeOrmModule.forFeature([CategoryEntity])],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
