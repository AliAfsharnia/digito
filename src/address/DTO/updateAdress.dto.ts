import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateAddressDTO{

    @ApiProperty({
         example: 'country',
        required: false
      })
    readonly country?: string;

    @ApiProperty({
         example: 'state',
         required: false
      })
    readonly state?: string;

    @ApiProperty({
        example: 'city',
        required: false
     })
    readonly city?: string;

     
    @ApiProperty({
        example: 'street',
        required: false
     })
    readonly street?: string;

    @ApiProperty({
        example: 'tag',
        required: false
     })
    readonly tag?: string;
}