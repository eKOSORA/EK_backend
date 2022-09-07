import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  Controller,
} from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.cookies?.[data] : request.cookies;
  },
);

export const JWTToken = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.jwt;
  },
);

export const ProtectedController = (ck: string, ctl: string) => {
  return applyDecorators(ApiCookieAuth(ck), Controller(ctl));
};
