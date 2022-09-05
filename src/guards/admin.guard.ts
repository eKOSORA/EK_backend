import { yellow } from './../config/oneliners';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: any = context.switchToHttp().getRequest();
    console.log(yellow('[AdminGuard] '), 'Checking');
    return !!request.jwt?.isAdmin;
  }
}
