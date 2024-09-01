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

     @ApiProperty({ type: 'string', format: 'binary', description: 'Profile picture of the user' })
     profilePicture?: Express.Multer.File;

     @ApiProperty({
          example: 'string',
          required: false
       })
     readonly bio?: string
}