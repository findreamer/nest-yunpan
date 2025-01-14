import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception?.getResponse() : exception;

    response.status(status).json({
      code: status,
      msg:
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : ((exceptionResponse as any).message ?? '服务器异常'),
    });
  }
}
