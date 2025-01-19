import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ImageCaptcha } from '../models/auth.model';
import { ApiResult } from '@/common/decorators/api-result.decorator';
import { ImageCaptchaDto } from '../dto/captcha.dto';
import isEmpty from 'lodash/isEmpty';
import * as svgCaptcha from 'svg-captcha';
import { generateUUID } from '@/utils';
import { InjectRedis } from '@/common/decorators/inject.redis.dectors';
import { Redis } from 'ioredis';
import { genCaptchaImgKey } from '@/utils/genRedisKey';

@ApiTags('Captcha - 验证码')
@Controller('auth/captcha')
export class CaptchaController {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  @ApiOperation({
    summary: '获取验证码',
  })
  @ApiResult({ type: ImageCaptcha })
  @Get('img')
  async captchaByImg(
    @Query() ImageCaptchaDto: ImageCaptchaDto,
  ): Promise<ImageCaptcha> {
    const { width, height } = ImageCaptchaDto;
    const svg = svgCaptcha.create({
      size: 4,
      color: true,
      noise: 4,
      width: isEmpty(width) ? 100 : width,
      height: isEmpty(height) ? 50 : height,
    });

    const result = {
      img: `data:image/svg+xml;base64,${Buffer.from(svg.data).toString('base64')}`,
      id: generateUUID(),
    };

    await this.redis.set(genCaptchaImgKey(result.id), svg.text, 'EX', 60 * 5);
    return result;
  }
}
