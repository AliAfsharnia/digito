import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAddressDTO{

    @ApiProperty({
         example: 'string',
        required: true
      })
    @IsNotEmpty()
    readonly country: string;

    @ApiProperty({
         example: 'string',
         required: true
      })
    @IsNotEmpty()
    readonly state: string;

    @ApiProperty({
        example: 'string',
        required: true
     })
    @IsNotEmpty()
    readonly city: string;

     
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