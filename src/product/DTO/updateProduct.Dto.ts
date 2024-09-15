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
        example: 'string',
        required: false
    })
    readonly description?: string;

    @ApiProperty({isArray: true, type: 'string', format: 'binary', description: 'Profile picture of the user' , required: false})
    public images?: string[];

    @ApiProperty({
        example: 'string, string',
        required: false
     })
    readonly colors?: string[];
    }