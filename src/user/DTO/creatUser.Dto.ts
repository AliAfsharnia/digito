import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDTO{

     @ApiProperty({
          example: 'string',
          required: true
       })
     @IsNotEmpty()
     readonly username: string;

     @ApiProperty({
          example: 'email-string',
          required: true
       })
       
     @IsNotEmpty()
     @IsEmail()
     readonly email: string;

     @ApiProperty({
          example: 'string',
          required: true
       })
     @IsNotEmpty()
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