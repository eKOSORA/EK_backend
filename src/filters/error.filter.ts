import { yellow, checkEmoji } from './../config/oneliners';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

export interface CustomResponse extends Response {
  code?: string;
}

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log(yellow(checkEmoji, 'INTERCEPTING...'));
    console.log(exception);
    const context = host.switchToHttp();
    const response = context.getResponse<CustomResponse>();
    const exceptionResponse: any = exception.getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      code:
        (exceptionResponse ? exceptionResponse.code : undefined) || '#Error',
      message:
        (exceptionResponse ? exceptionResponse.message : undefined) ||
        exceptionResponse ||
        'Something went wrong. Please try again.',
    });
  }
}
