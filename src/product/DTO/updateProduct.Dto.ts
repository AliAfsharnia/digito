import { ApiProperty } from "@nestjs/swagger";

export class updateProductDTO{

    @ApiProperty({
          example: 'string',
          required: false
    })
    readonly title?: string;

    @ApiProperty({
        example: 'number',
        required: false
     })
    readonly stockCount?: number;

    @ApiProperty({
        example: 'number',
        required: false
     })
    readonly price?: number;

    @ApiProperty({
        example: 'number',
        required: false
     })
    readonly CategoryId?: number;

    @ApiProperty({
        example: "number",
        required: false
     })
    readonly BrandId?: number;

    @ApiProperty({
        example: 'string',
        required: false
    })
    readonly guarantee?: string;
     
    @ApiProperty({
        example: 'string',
        required: false
    })
    readonly description?: string;

    @ApiProperty({
        example: 'string, string',
        required: false
     })
    readonly colors?: string[];
    }