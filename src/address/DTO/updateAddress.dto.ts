import { ApiProperty } from "@nestjs/swagger";

export class UpdateAddressDTO{

  @ApiProperty({
    example: 'string',
    required: false
 })
readonly description?: string;

@ApiProperty({
   example: 'number',
   required: false
})
readonly cityId?: number;

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