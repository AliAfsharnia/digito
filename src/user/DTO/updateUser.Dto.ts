import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class UpdateUserDto{

     @ApiProperty({
          example: 'user1',
          required: false
       })
     readonly username: string;

     @ApiProperty({
          example: 'user1@gmail.com',
          required: false
       })
     @IsEmail()
     readonly email: string;

     @ApiProperty({
          example: '123',
          required: false
       })
     readonly password: string;
}