import { Test, TestingModule } from '@nestjs/testing';
import { ReviewAndRatingService } from './review-and-rating.service';

describe('ReviewAndRatingService', () => {
  let service: ReviewAndRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewAndRatingService],
    }).compile();

    service = module.get<ReviewAndRatingService>(ReviewAndRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
