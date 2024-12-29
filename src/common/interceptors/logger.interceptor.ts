import {
  Injectable,
  NestInterceptor,
  Logger,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private logger = new Logger(LoggerInterceptor.name, { timestamp: false });

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const call$ = next.handle();
    const request = context.switchToHttp().getRequest<Request>();
    const content = `${request.method} -> ${request.url}`;
    const isSse = request.headers.accept === 'text/event-stream';
    this.logger.debug(`+++ 请求：${content}`);

    const now = Date.now();
    return call$.pipe(
      tap(() => {
        if (isSse) return;

        this.logger.debug(`--- 响应：${content}${` +${Date.now() - now}ms`}`);
      }),
    );
  }
}
