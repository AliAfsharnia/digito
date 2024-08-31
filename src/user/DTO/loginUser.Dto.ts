import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDTO{

     @ApiProperty({
          example: 'string',
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
}