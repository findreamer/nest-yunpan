import { ApiProperty } from '@nestjs/swagger';

export class LoginRes {
  @ApiProperty({
    description: 'token',
  })
  token: string;
}

export class ImageCaptcha {
  @ApiProperty({
    description: 'base64图片 格式的验证码',
  })
  img: string;

  @ApiProperty({
    description: '验证码唯一id',
  })
  id: string;
}
