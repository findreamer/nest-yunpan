import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: '手机号/邮箱',
  })
  @IsString()
  @MinLength(4)
  username: string;

  @ApiProperty({
    description: '密码',
  })
  @IsString()
  @IsString()
  @Matches(/^\S*(?=\S{6})(?=\S*\d)(?=\S*[A-Z])\S*$/i)
  @MinLength(6)
  @MaxLength(16)
  password: string;

  @ApiProperty({
    description: '验证码',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(4)
  verifyCode: string;
}

export class RegisterDto {
  @ApiProperty({
    description: '账号',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: '密码',
  })
  @IsString()
  @Matches(/^\S*(?=\S{6})(?=\S*\d)(?=\S*[A-Z])\S*$/i)
  @MinLength(6)
  @MaxLength(16)
  password: string;
}
