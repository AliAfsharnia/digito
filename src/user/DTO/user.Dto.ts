import { Exclude, Expose } from 'class-transformer';

export class UserDto {
    @Expose()
    userId: number;

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
    roll: string;

    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
    }
}
