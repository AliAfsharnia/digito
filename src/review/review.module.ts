import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './review.entity';
import { UserEntity } from 'src/user/user.entity';
import { ProductEntity } from 'src/product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity]),TypeOrmModule.forFeature([UserEntity]),TypeOrmModule.forFeature([ProductEntity])],
  providers: [ReviewService],
  controllers: [ReviewController]
})
export class ReviewModule {}
