import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateBrandDTO{

     @ApiProperty({
          example: 'string',
          required: false
       })
     @IsNotEmpty()
     readonly name?: string;

     @ApiProperty({
          example: 'string',
          required: false
       })
     @IsNotEmpty()
     readonly description?: string;

     @ApiProperty({
        example: 'string',
        required: false
     })
    @IsNotEmpty()
    readonly image?: string;
}