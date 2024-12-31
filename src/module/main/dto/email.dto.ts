import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class SendEmailCodeDto {
  @ApiProperty({
    description: '邮箱',
    required: true,
  })
  @IsString()
  @Length(1, 150)
  email: string;

  @ApiProperty({
    description: '验证码',
    required: true,
  })
  @IsString()
  @Length(4, 4)
  code: string;
  @ApiProperty({
    description: 'uuid',
    required: true,
  })
  @IsString()
  uuid: string;
}
