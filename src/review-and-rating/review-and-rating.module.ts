import { Module } from '@nestjs/common';
import { ReviewAndRatingController } from './review-and-rating.controller';
import { ReviewAndRatingService } from './review-and-rating.service';

@Module({
  controllers: [ReviewAndRatingController],
  providers: [ReviewAndRatingService]
})
export class ReviewAndRatingModule {}
