import { InjectRedis } from '@/common/decorators/inject.redis.dectors';
import { IAuthUser } from '@/types/global';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import Redis from 'ioredis';
import { AccessTokenEntity } from '../entities/access-token.entity';
import { UserEntity } from '@/module/user/entities/user.entity';
import dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';
import { generateUUID } from '@/utils';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  /**
   * 生成accessToken
   * @param uid userId
   * @param roles 角色values
   */
  async generateAccessToken(uid: number, roles: string[]) {
    const payload: IAuthUser = {
      uid,
      roles,
      pv: 1,
    };

    const jwtSign = await this.jwtService.signAsync(payload);

    // 生成accessToken
    const accessToken = new AccessTokenEntity();
    accessToken.value = jwtSign;
    accessToken.user = { id: uid } as UserEntity;
    accessToken.expired_at = dayjs()
      .add(this.configService.get('jwt.expire'), 'second')
      .toDate();
    await accessToken.save();

    // 生成refreshToken
    const refreshToken = await this.generateRefreshToken(accessToken, dayjs());

    return {
      accessToken: jwtSign,
      refreshToken,
    };
  }

  /**
   * 生成新的RefreshToken并存入数据库
   * @param accessToken
   * @param now
   */
  async generateRefreshToken(accessToken: AccessTokenEntity, now: dayjs.Dayjs) {
    const refreshTokenPayload = {
      uuid: generateUUID(),
    };

    const refreshTokenSign = await this.jwtService.signAsync(
      refreshTokenPayload,
      {
        secret: this.configService.get('jwt.refresh_secret'),
      },
    );
    const refreshToken = new RefreshTokenEntity();
    refreshToken.value = refreshTokenSign;
    refreshToken.expired_at = now
      .add(this.configService.get('jwt.refresh_expire'), 'second')
      .toDate();
    refreshToken.accessToken = accessToken;
    await refreshToken.save();
    return refreshTokenSign;
  }
}
