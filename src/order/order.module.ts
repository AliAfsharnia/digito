import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderEntity } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProductEntity } from './orderProduct.entity';
import { ProductEntity } from 'src/product/product.entity';

@Module({
  imports: [  TypeOrmModule.forFeature([OrderEntity, ]), TypeOrmModule.forFeature([OrderProductEntity]), TypeOrmModule.forFeature([ProductEntity])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
