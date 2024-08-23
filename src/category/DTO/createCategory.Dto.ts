import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCategoryDTO{

     @ApiProperty({
          example: 'category1',
          required: true
       })
     @IsNotEmpty()
     readonly name: string;

     @ApiProperty({
          example: ' ',
          required: false
       })
     @IsNotEmpty()
     readonly description: string;

     @ApiProperty({
        example: ' ',
        required: false
     })
    @IsNotEmpty()
    readonly image: string;
}