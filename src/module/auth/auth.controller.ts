import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@ApiTags('Auth - 认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '登录',
  })
  @Post('login')
  async login(@Body() dto: LoginDto) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {}
}
