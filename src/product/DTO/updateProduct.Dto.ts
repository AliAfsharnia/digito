import { ApiProperty } from "@nestjs/swagger";

export class updateProductDTO{

    @ApiProperty({
          example: 'product1',
          required: false
    })
    readonly title?: string;

    @ApiProperty({
        example: 0,
        required: false
     })
    readonly stockCount?: number;

    @ApiProperty({
        example: 0,
        required: false
     })
    readonly price?: number;

    @ApiProperty({
        example: 1,
        required: false
     })
    readonly brandId?: number;

    @ApiProperty({
        example: 1,
        required: false
     })
    readonly categoryId?: number;

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
        required: false
    })
    readonly seller?:string

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