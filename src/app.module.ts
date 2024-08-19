import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { LogModule } from './log/log.module';
import { NotificationModule } from './notification/notification.module';
import { DiscountandPromotionModule } from './discountand-promotion/discountand-promotion.module';
import { ReviewAndRatingModule } from './review-and-rating/review-and-rating.module';
import { PaymentModule } from './payment/payment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import ormconfig from './ormconfig';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './auth/middleware/auth.middleware';

@Module({
  imports: [ ConfigModule.forRoot({isGlobal: true,}), TypeOrmModule.forRoot(ormconfig), UserModule, ProductModule, OrderModule, LogModule, NotificationModule, DiscountandPromotionModule, ReviewAndRatingModule, PaymentModule, AuthModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes({
      path:"*",
      method: RequestMethod.ALL,
    });
  }
}
