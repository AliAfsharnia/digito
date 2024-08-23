import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateBrandDTO{

     @ApiProperty({
          example: 'brand1',
          required: false
       })
     readonly name?: string;

     @ApiProperty({
          example: ' ',
          required: false
       })
     readonly description?: string;

     @ApiProperty({
        example: ' ',
        required: false
     })
    readonly image?: string;
}