import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateBrandDTO{

     @ApiProperty({
          example: 'string',
          required: true
       })
     @IsNotEmpty()
     readonly name: string;

     @ApiProperty({
          example: 'string',
          required: false
       })
     readonly description?: string;

     @ApiProperty({
        example: 'string',
        required: false
     })
     
     @ApiProperty({ type: 'string', format: 'binary', description: 'Profile picture of the user' , required: false})
     public image?: string;
}