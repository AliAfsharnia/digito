import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAddressDTO{

    @ApiProperty({
         example: 'country',
        required: true
      })
    @IsNotEmpty()
    readonly country: string;

    @ApiProperty({
         example: 'state',
         required: true
      })
    @IsNotEmpty()
    readonly state: string;

    @ApiProperty({
        example: 'city',
        required: true
     })
    @IsNotEmpty()
    readonly city: string;

     
    @ApiProperty({
        example: 'street',
        required: true
     })
    @IsNotEmpty()
    readonly street: string;

    @ApiProperty({
        example: 'tag',
        required: true
     })
    @IsNotEmpty()
    readonly tag: string;
}