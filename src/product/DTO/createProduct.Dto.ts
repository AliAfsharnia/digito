import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProductDTO{

    @ApiProperty({
          example: 'product1',
          required: true
    })
    @IsNotEmpty()
    readonly title: string;

    @ApiProperty({
        example: 0,
        required: true
     })
    @IsNotEmpty()
    readonly stockCount: number;

    @ApiProperty({
        example: 0,
        required: true
     })
    @IsNotEmpty()
    readonly price: number;

    @ApiProperty({
        example: 1,
        required: true
     })
    @IsNotEmpty()
    readonly brandId: number;

    @ApiProperty({
        example: 1,
        required: true
     })
    @IsNotEmpty()
    readonly categoryId: number;

    @ApiProperty({
        example: ' ',
        required: false
    })
    readonly garanty?: string;
     
    @ApiProperty({
        example: ' ',
        required: false
    })
    readonly description?: string;

    @ApiProperty({
        example: 'seller1',
        required: true
    })
    readonly seller:string

    @ApiProperty({
        example: 'url1, url2',
        required: false
    })
    readonly images?: string[];

    @ApiProperty({
        example: 'red, blue',
        required: false
     })
    readonly colors?: string[];
    }