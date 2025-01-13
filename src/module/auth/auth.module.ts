import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
      }),
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
