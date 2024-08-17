import { Module } from '@nestjs/common';
import { DiscountandPromotionController } from './discountand-promotion.controller';
import { DiscountandPromotionService } from './discountand-promotion.service';

@Module({
  controllers: [DiscountandPromotionController],
  providers: [DiscountandPromotionService]
})
export class DiscountandPromotionModule {}
