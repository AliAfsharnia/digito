import { Test, TestingModule } from '@nestjs/testing';
import { ReviewAndRatingController } from './review-and-rating.controller';

describe('ReviewAndRatingController', () => {
  let controller: ReviewAndRatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewAndRatingController],
    }).compile();

    controller = module.get<ReviewAndRatingController>(ReviewAndRatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
