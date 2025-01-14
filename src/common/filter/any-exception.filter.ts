import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { BusinessException } from '../exceptions/biz.exception';
import { isDev } from '@/utils';
import { ErrorEnum } from '../constant';
@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AnyExceptionFilter.name);
  constructor() {
    this.registerCatchAllExceptionsHook();
  }
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = this.getStatus(exception);
    const url = request.url;

    let message = this.getErrorMessage(exception);

    // 系统内部错误
    if (
      status === HttpStatus.INTERNAL_SERVER_ERROR &&
      !(exception instanceof BusinessException)
    ) {
      this.logger.error(exception, undefined, 'Cache');

      if (!isDev) {
        message = ErrorEnum.SERVER_ERROR?.split(':')[1];
      }
    } else {
      this.logger.error(
        `错误信息：(${status}) ${message} Path: ${decodeURI(url)}`,
      );
    }

    const apiErrorCode =
      exception instanceof BusinessException
        ? exception.getErrorCode()
        : status;

    const resBody = {
      code: apiErrorCode,
      message,
      data: null,
    };
    return response.status(status).send(resBody);
  }

  getStatus(exception: unknown) {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    } else if (exception instanceof QueryFailedError) {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    } else {
      return (
        (exception as any).status ??
        (exception as any)?.statusCode ??
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  getErrorMessage(exception: unknown) {
    if (exception instanceof HttpException) {
      return exception.message;
    } else if (exception instanceof QueryFailedError) {
      return exception.message;
    } else {
      return (
        (exception as any)?.response?.message ??
        (exception as any)?.message ??
        `${exception}`
      );
    }
  }

  registerCatchAllExceptionsHook() {
    process.on('unhandledRejection', (reason) => {
      console.error('unhandledRejection: ', reason);
    });

    process.on('uncaughtException', (err) => {
      console.error('uncaughtException: ', err);
    });
  }
}
