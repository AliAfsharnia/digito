import { Body, Controller, Get, Param, Post, UseGuards, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { CreateReviewDTO } from './DTO/creatReview.Dto';
import { ReviewEntity } from './review.entity';
import { User } from 'src/user/decoratores/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { AdminAuthGuard } from 'src/auth/Guards/auth.admin.guard';
import { promises } from 'dns';

@ApiTags("Reviews")
@Controller('')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService){}

    @ApiBearerAuth()
    @Post(':productSlug/add_comment')
    @ApiBody({
        type: CreateReviewDTO,
        description: 'example for creating review',
    })
    @UseGuards(AuthGuard)
    async createReview(@User()CurrentUser: UserEntity, @Param('productSlug') slug: string, @Body() createReviewDTO: CreateReviewDTO): Promise<ReviewEntity>{
        return await this.reviewService.createReview(CurrentUser, slug, createReviewDTO);
    }

    @Get(":productSlug/comments")
    async getProductReviews(@Param('productSlug')slug: string):Promise<ReviewEntity[]>{
        return await this.reviewService.getProductReviews(slug);
    }

    @ApiBearerAuth()
    @Patch('comments/:id/approve')
    @UseGuards(AdminAuthGuard)
    async approve(@Param('id') id: string):Promise<ReviewEntity>{
        return await this.reviewService.approve(id);
    }

    @ApiBearerAuth()
    @Get('comments/unapproved')
    @UseGuards(AdminAuthGuard)
    async unapproved():Promise<ReviewEntity[]>{
        return await this.reviewService.unapproved();
    }
}
