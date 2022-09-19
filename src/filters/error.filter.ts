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
    const context = host.switchToHttp();
    const response = context.getResponse<CustomResponse>();
    const exceptionResponse: any = exception.getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      code: exceptionResponse.code || '#Error',
      message: exceptionResponse.message || exceptionResponse,
    });
  }
}
