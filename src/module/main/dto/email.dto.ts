import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class SendEmailCodeDto {
  @ApiProperty({
    description: '邮箱',
    required: true,
  })
  @IsString({ message: '邮箱必须为字符串' })
  @Length(1, 150, { message: '邮箱长度不能超过150个字符' })
  email: string;

  @ApiProperty({
    description: '验证码',
    required: true,
  })
  @IsString({ message: '验证码必须为字符串' })
  code: string;

  @ApiProperty({
    description: 'uuid',
    required: true,
  })
  @IsString({ message: 'uuid必须为字符串' })
  uuid: string;
}
