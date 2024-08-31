import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateAddressDTO{

    @ApiProperty({
         example: 'string',
        required: false
      })
    readonly country?: string;

    @ApiProperty({
         example: 'string',
         required: false
      })
    readonly state?: string;

    @ApiProperty({
        example: 'string',
        required: false
     })
    readonly city?: string;

     
    @ApiProperty({
        example: 'string',
        required: false
     })
    readonly street?: string;

    @ApiProperty({
        example: 'string',
        required: false
     })
    readonly tag?: string;
}