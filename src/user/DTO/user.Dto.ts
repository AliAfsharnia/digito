import { Exclude, Expose } from 'class-transformer';

export class UserDto {
    @Expose()
    id: number;

    @Expose()
    username: string;

    @Expose()
    email: string;

    @Exclude()
    password: string;

    @Expose()
    image: string;

    @Expose()
    bio: string;

    @Expose()
    role: string;

    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
    }
}
