import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAttributeDto{

    @ApiProperty({
          example: 'string',
          required: true
    })
    @IsNotEmpty()
    readonly key: string;

    @ApiProperty({
        example: 'string',
        required: true
    })
    @IsNotEmpty()
    readonly value: string;
}