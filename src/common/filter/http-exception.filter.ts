import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RESPONSE_CODE_MSG } from '../constant';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(200).json({
      code: status,
      msg: exception.message ?? RESPONSE_CODE_MSG[status] ?? '服务器异常',
      timestamp: new Date().toISOString(),
      path: request.url,
      data: null,
    });
  }
}
