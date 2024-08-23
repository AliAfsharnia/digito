import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateBrandDTO{

     @ApiProperty({
          example: 'brand1',
          required: false
       })
     @IsNotEmpty()
     readonly name?: string;

     @ApiProperty({
          example: ' ',
          required: false
       })
     @IsNotEmpty()
     readonly description?: string;

     @ApiProperty({
        example: ' ',
        required: false
     })
    @IsNotEmpty()
    readonly image?: string;
}