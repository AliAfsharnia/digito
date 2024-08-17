import { Test, TestingModule } from '@nestjs/testing';
import { DiscountandPromotionService } from './discountand-promotion.service';

describe('DiscountandPromotionService', () => {
  let service: DiscountandPromotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscountandPromotionService],
    }).compile();

    service = module.get<DiscountandPromotionService>(DiscountandPromotionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
