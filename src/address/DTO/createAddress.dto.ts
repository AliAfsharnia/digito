import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAddressDTO{

    @ApiProperty({
         example: 'string',
         required: true
      })
    @IsNotEmpty()
    readonly description: string;

    @ApiProperty({
        example: 'number',
        required: true
     })
    @IsNotEmpty()
    readonly city: number;

    @ApiProperty({
      example: 'number',
      required: true
   })
    @IsNotEmpty()
    readonly province: number;

    @ApiProperty({
        example: 'string',
        required: true
     })
    @IsNotEmpty()
    readonly street: string;

    @ApiProperty({
        example: 'string',
        required: true
     })
    @IsNotEmpty()
    readonly tag: string;
}