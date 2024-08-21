import { Request } from "express";
import { UserDto } from "src/user/DTO/user.Dto";
export interface ExpressRequest extends Request{
    req: Promise<UserDto>;
    user? :UserDto;
}