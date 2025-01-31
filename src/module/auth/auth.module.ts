import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessTokenEntity } from './entities/access-token.entity';
import { RefreshTokenEntity } from './entities/refresh-token.entity';
import { CaptchaController } from './controllers/captcha.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { CaptchaService } from './services/captcha.service';
import { TokenService } from './services/token.service';

const controllers = [CaptchaController];
const providers = [AuthService, CaptchaService, TokenService];

@Module({
  imports: [
    TypeOrmModule.forFeature([AccessTokenEntity, RefreshTokenEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
      }),
    }),
    PassportModule,
    UserModule,
  ],
  controllers: [...controllers],
  providers: [...providers],
})
export class AuthModule {}
