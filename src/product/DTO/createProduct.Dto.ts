import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProductDTO{

    @ApiProperty({
          example: 'string',
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
        example: 0,
        required: true
     })
    @IsNotEmpty()
    readonly brandId: number;

    @ApiProperty({
        example: 0,
        required: true
     })
    @IsNotEmpty()
    readonly categoryId: number;

    @ApiProperty({
        example: 'string',
        required: false
    })
    readonly garanty?: string;
     
    @ApiProperty({
        example: 'string',
        required: false
    })
    readonly description?: string;

    @ApiProperty({
        example: 'string, string',
        required: false
    })
    readonly images?: string[];

    @ApiProperty({
        example: 'string, string',
        required: false
     })
    readonly colors?: string[];
    }