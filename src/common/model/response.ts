import { RESPONSE_SUCCESS_MSG, RESPONSE_SUCCESS_CODE } from '@/common/constant';
import { ApiProperty } from '@nestjs/swagger';

export class ResOp<T = any> {
  @ApiProperty()
  data?: T;

  @ApiProperty({ type: 'number', default: RESPONSE_SUCCESS_CODE })
  code: number;

  @ApiProperty({
    type: 'string',
    default: RESPONSE_SUCCESS_MSG,
  })
  msg: string;

  constructor(code: number, data: T, msg: string) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  static success<T>(data: T, message: string) {
    return new ResOp<T>(RESPONSE_SUCCESS_CODE, data, message);
  }

  static fail<T>(code: number, message: string) {
    return new ResOp<T>(code, null, message);
  }
}
