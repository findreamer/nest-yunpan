import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ImageCaptcha } from '../models/auth.model';
import { ApiResult } from '@/common/decorators/api-result.decorator';

@ApiTags('Captcha - 验证码')
@Controller('auth/captcha')
export class CaptchaController {
  constructor() {}
  @ApiOperation({
    summary: '获取验证码',
  })
  @ApiResult({ type: ImageCaptcha })
  @Get('img')
  async captchaByImg() {}
}
