import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class CreateReviewDTO{

     @ApiProperty({
          example: 'string',
          required: true
       })
     @IsNotEmpty()
     readonly subject: string;

     @ApiProperty({
          example: 'number 1 - 5',
          required: true
       })
       
     @IsNotEmpty()
     @IsNumber()
     @Min(0)
     @Max(5)
     readonly rating: number;

     @ApiProperty({
          example: 'string',
          required: true
       })
     @IsNotEmpty()
     readonly context: string;
}