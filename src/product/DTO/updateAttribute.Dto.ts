import { ApiProperty } from "@nestjs/swagger";

export class UpdateAttributeDTO{

    @ApiProperty({
          example: 'string',
          required: false
    })
    readonly key?: string;

    @ApiProperty({
        example: 'string',
        required: false
    })
    readonly value?: string;
}