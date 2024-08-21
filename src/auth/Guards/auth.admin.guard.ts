import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ExpressRequest } from "src/type/expressRequest.interface";


@Injectable()
export class AdminAuthGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean{
        const request = context.switchToHttp().getRequest<ExpressRequest>();
        if(request.user){
            if(request.user.isAdmin == 1){
                return true;
            }
        }   
        throw new HttpException('not authorized', HttpStatus.UNAUTHORIZED)
    }
} 