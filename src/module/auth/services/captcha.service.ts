import { InjectRedis } from '@/common/decorators/inject.redis.dectors';
import { genCaptchaImgKey } from '@/utils/genRedisKey';
import { Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import Redis from 'ioredis';
import { BusinessException } from '@/common/exceptions/biz.exception';
import { ErrorEnum } from '@/common/constant';

@Injectable()
export class CaptchaService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  /**
   * 校验图片验证码
   */
  async validateCaptcha(id: string, code: string) {
    const redisCode = await this.redis.get(genCaptchaImgKey(id));
    if (isEmpty(redisCode) || redisCode.toUpperCase !== code.toUpperCase)
      return new BusinessException(ErrorEnum.INVALID_VERIFICATION_CODE);

    // 验证成功，删除验证码
    await this.redis.del(genCaptchaImgKey(id));
  }
}
