import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReviewEntity } from './review.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewDTO } from './DTO/createReview.Dto';
import { ProductEntity } from 'src/product/product.entity';
import { UserEntity } from 'src/user/user.entity';
import { Massages } from 'src/massages/massages';

@Injectable()
export class ReviewService {
    constructor(@InjectRepository(ReviewEntity) private readonly reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>){}

    async createReview(currentUser: UserEntity, id: number, createReviewDTO: CreateReviewDTO): Promise<ReviewEntity>{
        const product = await this.productRepository.findOne({where: {id: id}})

        if(!product){
            throw new HttpException(Massages.PRODUCT_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const newReview = await this.reviewRepository.create();

        Object.assign(newReview, createReviewDTO);

        newReview.user = currentUser;

        newReview.product = product;

        const result = await this.reviewRepository.save(newReview);

        console.info(Massages.REVIEW_CREATED, result.id);

        return result;
    }

    async getProductReviews(id: number): Promise<ReviewEntity[]>{
        const product = await this.productRepository.findOne({where: {id: id}})
        const reviews = await this.reviewRepository.createQueryBuilder('reviews')
        .where('reviews."productId" = :id', { id: product.id })
        .getMany();

        return  reviews;
    }

    async approve(id: string): Promise<ReviewEntity>{
        const review = await this.reviewRepository.findOne({where: {id: +id}});

        review.approved = true;

        const result = await this.reviewRepository.save(review);

        console.info(Massages.REVIEW_APPROVED, result.id)

        return result;
    }

    async unapproved(): Promise<ReviewEntity[]>{
        return await this.reviewRepository.find({ where: {approved : false}});
    }
}
