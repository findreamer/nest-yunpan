import { Injectable } from '@nestjs/common';
import { createMath, GenerateUUID } from '@/utils';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { CacheEnum } from '@/common/constant/cache';

@Injectable()
export class MainService {
  private redis: Redis;
  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getOrThrow();
  }
  async getCaptcha() {
    try {
      const captchaInfo = createMath();
      const data = {
        img: captchaInfo.data,
        uuid: GenerateUUID(),
      };
      await this.redis.set(
        CacheEnum.CAPTCHA_CODE_KEY + data.uuid,
        captchaInfo.text.toLowerCase(),
        'EX',
        60 * 5,
      );
      return data;
    } catch (error) {
      return new Error(error);
    }
  }
}
