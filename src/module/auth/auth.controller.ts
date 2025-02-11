import { Body, Controller, Headers, Ip, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { Public } from '@/common/decorators/public.decorator';
import { LocalGuard } from '@/common/guard/local.guard';
import { ApiResult } from '@/common/decorators';
import { LoginRes } from './models/auth.model';
import { CaptchaService } from './services/captcha.service';
import { UserService } from '../user/user.service';

@ApiTags('Auth - 认证')
@Controller('auth')
@Public()
@UseGuards(LocalGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly captchaService: CaptchaService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({
    summary: '登录',
  })
  @Post('login')
  @ApiResult({ type: LoginRes })
  async login(
    @Body() dto: LoginDto,
    @Ip() ip: string,
    @Headers('user-agent') ua: string,
  ) {
    await this.captchaService.validateCaptcha(dto.captchaId, dto.verifyCode);
    const { username, password } = dto;
    const token = await this.authService.login(username, password, ip, ua);

    return { token };
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    await this.userService.register(dto);
  }
}
