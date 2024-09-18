import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class PlaceOrderDTO{

    @ApiProperty({
        example: 'number',
        required: true
    })
    readonly productid: number;
       
    @ApiProperty({
        example: 'number',
        required: true
    })
    readonly quantity: number;
}