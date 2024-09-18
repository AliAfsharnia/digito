import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AddPhotosDTO{
    @ApiProperty({isArray: true, type: 'string', format: 'binary', description: 'Profile picture of the user' , required: false})
    public images?: string[];
}