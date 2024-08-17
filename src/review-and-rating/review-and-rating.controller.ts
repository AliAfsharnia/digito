import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("comments")
@Controller('review-and-rating')
export class ReviewAndRatingController {}
