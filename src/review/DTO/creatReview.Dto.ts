import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class CreateReviewDTO{

     @ApiProperty({
          example: 'subject',
          required: true
       })
     @IsNotEmpty()
     readonly subject: string;

     @ApiProperty({
          example: 2.5,
          required: true
       })
       
     @IsNotEmpty()
     @IsNumber()
     @Min(0)
     @Max(5)
     readonly rating: number;

     @ApiProperty({
          example: '',
          required: true
       })
     @IsNotEmpty()
     readonly description: string;

     @ApiProperty({
          example: 'url1, url2',
          required: false
      })
      readonly images?: string[];

}