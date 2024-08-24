import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { BrandEntity } from 'src/brand/brand.entity';
import { CategoryEntity } from 'src/category/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), TypeOrmModule.forFeature([BrandEntity]), TypeOrmModule.forFeature([CategoryEntity])],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
