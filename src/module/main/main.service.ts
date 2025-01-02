import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { createMath, GenerateUUID } from '@/utils';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { CacheEnum } from '@/common/constant/cache';
import { MailerService } from '@/shared/mailer/mailer.service';

@Injectable()
export class MainService {
  private redis: Redis;
  constructor(
    private readonly redisService: RedisService,
    private readonly mailerService: MailerService,
  ) {
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

  async sendEmailCode(email: string, code: string, uuid: string) {
    try {
      const cacheKey = CacheEnum.CAPTCHA_CODE_KEY + uuid;
      const captcha = await this.redis.get(cacheKey);
      if (!captcha) {
        throw new Error('验证码不存在');
        throw new HttpException('验证码已过期', HttpStatus.BAD_REQUEST);
      }
      if (captcha.toLowerCase() !== code.toLowerCase()) {
        throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST);
      }
      await this.redis.del(cacheKey);
      // 发送邮件
      return this.mailerService.sendMail({
        to: email,
        subject: '验证码',
        html: `<p>您的验证码是：${code}</p>`,
      });
    } catch (error) {
      return new Error(error);
    }
  }

  sendEmail() {}
}
