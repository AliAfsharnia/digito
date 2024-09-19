import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Massages } from "src/massages/massages";
import { ExpressRequest } from "src/type/expressRequest.interface";


@Injectable()
export class AuthGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean{
        const request = context.switchToHttp().getRequest<ExpressRequest>();
        if(request.user){
            return true;
        }
        throw new HttpException(Massages.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED)
    }
} 