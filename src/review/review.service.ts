import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReviewEntity } from './review.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewDTO } from './DTO/creatReview.Dto';
import { ProductEntity } from 'src/product/product.entity';
import { UserEntity } from 'src/user/user.entity';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class ReviewService {
    constructor(@InjectRepository(ReviewEntity) private readonly reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
     private dataSourse:DataSource){}

    async createReview(currentUser: UserEntity, id: number, createReviewDTO: CreateReviewDTO): Promise<ReviewEntity>{
        const product = await this.productRepository.findOne({where: {productId: id}})

        if(!product){
            throw new HttpException("this product doesn't exist", HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const newReview = await this.reviewRepository.create();

        Object.assign(newReview, createReviewDTO);

        newReview.user = currentUser;

        newReview.product = product;

        const result = await this.reviewRepository.save(newReview);

        console.info("Review created successfuly: ", result.reviweId)

        return result;
    }

    async getProductReviews(id: number): Promise<ReviewEntity[]>{
        const product = await this.productRepository.findOne({where: {productId: id}})
        const reviews = await this.reviewRepository.createQueryBuilder('reviews')
        .where('reviews."productProductId" = :productId', { productId: product.productId })
        .getMany();

        return  reviews;
    }

    async approve(id: string): Promise<ReviewEntity>{
        const review = await this.reviewRepository.findOne({where: {reviweId: +id}});

        review.approved = true;

        const result = await this.reviewRepository.save(review);

        console.info("Review approved successfuly: ", result.reviweId)

        return result;
    }

    async unapproved(): Promise<ReviewEntity[]>{
        return await this.reviewRepository.find({ where: {approved : false}});
    }
}
