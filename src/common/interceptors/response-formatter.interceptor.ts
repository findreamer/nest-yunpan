import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from '../typing/global';

@Injectable()
export class ResponseFormatterInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse> {
    return next.handle().pipe(
      map((data) => {
        const response = {
          code: 200,
          success: true,
          data,
          msg: '请求成功',
        };
        if (Array.isArray(data)) {
          response.data = {
            rows: data,
            total: data.length,
          };
        }

        return response;
      }),
    );
  }
}
