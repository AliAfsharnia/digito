import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MinLength, NotEquals } from "class-validator";

export class UpdateUserDto{

     @ApiProperty({
          example: 'string',
          required: false,
          minLength: 4
     })
     @MinLength(4)
     readonly username?: string;

     @ApiProperty({
          example: 'string-email',
          required: false,
          minLength: 5
       })
     @MinLength(1)
     @IsEmail()
     @MinLength(5)
     readonly email?: string;

     @ApiProperty({
          example: 'string',
          required: false,
          minLength: 4
       })
     @MinLength(4)
     readonly password?: string;

     @ApiProperty({
          example: 'string',
          required: false,
          minLength: 4
       })
     readonly bio?: string
}