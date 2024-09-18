import { ApiProperty } from "@nestjs/swagger";

export class UpdateBrandPhotoDto{
    @ApiProperty({type: 'string', format: 'binary', description: 'Profile picture of the user' , required: false})
    public image?: string;
}
