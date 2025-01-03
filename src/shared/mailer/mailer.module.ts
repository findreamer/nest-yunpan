import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    NestMailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('email.host'),
          port: configService.get('email.port'),
          secure: configService.get('email.secure'),
          auth: {
            user: configService.get('email.auth.user'),
            pass: configService.get('email.auth.pass'),
          },
        },
        defaults: {
          from: configService.get('email.auth.user'),
          address: configService.get('email.auth.user'),
        },
      }),
    }),
  ],
  providers: [MailerService, ConfigService],
  exports: [MailerService],
})
export class MailerModule {}
