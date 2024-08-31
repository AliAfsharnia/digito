import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class UpdateUserDto{

     @ApiProperty({
          example: 'string',
          required: false
       })
     readonly username: string;

     @ApiProperty({
          example: 'string-email',
          required: false
       })
     @IsEmail()
     readonly email: string;

     @ApiProperty({
          example: 'string',
          required: false
       })
     readonly password: string;

     @ApiProperty({
          example: 'string',
          required: false
       })
     readonly image?: string;

     @ApiProperty({
          example: 'string',
          required: false
       })
     readonly bio?: string
}