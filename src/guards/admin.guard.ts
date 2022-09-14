import { yellow, checkEmoji } from './../config/oneliners';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class OnlyAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: any = context.switchToHttp().getRequest();
    console.log(yellow(checkEmoji, '[AdminGuard] '), 'Checking');
    return !!request.jwt?.isAdmin;
  }
}

@Injectable()
export class OnlyEducatorGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: any = context.switchToHttp().getRequest();
    console.log(yellow(checkEmoji, '[EducatorGuard] '), 'Checking');
    return request.jwt?.accountType === 'educator';
  }
}
