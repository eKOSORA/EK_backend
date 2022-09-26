import { red, yellow } from './../config/oneliners';
import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  Controller,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { SuccessResponse, ErrorResponse } from '../config/global.interface';

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

export const DefaultApiResponses = (ok?: string, error?: string) => {
  return applyDecorators(
    ApiOkResponse({
      description: ok || 'Successfully done task.',
      type: SuccessResponse,
    }),
    ApiResponse({
      status: 400,
      description: error || 'Something went wrong.',
      type: ErrorResponse,
    }),
  );
};

export const ErrorChecker = () => {
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const fn = descriptor.value;

    descriptor.value = function (...args) {
      console.log(yellow('[ ErrorChecker ] Checking...'));
      let _exec = (function () {
        return { code: '#ERROR', message: 'shit went down' };
      })();
      try {
        _exec = fn.call(this, ...args);
        return _exec;
      } catch (e) {
        console.log(red(`  [ ErrorChecker ] ${e.message}`));
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      }
    };
  };
};
