import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ResetPasswordDTO{
    @ApiProperty({
        example: 'string',
       required: true
     })
    @IsNotEmpty()
    readonly password: string
}