import { Test, TestingModule } from '@nestjs/testing';
import { DiscountandPromotionController } from './discountand-promotion.controller';

describe('DiscountandPromotionController', () => {
  let controller: DiscountandPromotionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountandPromotionController],
    }).compile();

    controller = module.get<DiscountandPromotionController>(DiscountandPromotionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
