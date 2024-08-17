import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { LogModule } from './log/log.module';
import { NotificationModule } from './notification/notification.module';
import { DiscountandPromotionModule } from './discountand-promotion/discountand-promotion.module';
import { ReviewAndRatingModule } from './review-and-rating/review-and-rating.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [UserModule, ProductModule, OrderModule, LogModule, NotificationModule, DiscountandPromotionModule, ReviewAndRatingModule, PaymentModule],
})
export class AppModule {}
