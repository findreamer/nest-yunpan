import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RESPONSE_CODE_MSG } from '../constant';
import { ResOp } from '../model/response';

@Injectable()
export class ResponseFormatterInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResOp> {
    return next.handle().pipe(
      map((data) => {
        return new ResOp(200, data, RESPONSE_CODE_MSG['200']);
      }),
    );
  }
}
