import { ApiProperty } from '@nestjs/swagger';

export class LoginRes {
  @ApiProperty({
    description: 'token',
  })
  token: string;
}
