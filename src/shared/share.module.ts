import { Global, Module } from '@nestjs/common';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import configuration from '@/config';
import { LoggerModule } from './logger/logger.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: 'mysql',
          entities: [`${__dirname}/**/*.entity{.ts,.js}`],
          autoLoadEntities: true,
          synchronize: true,
          keepConnectionAlive: true,
          timezone: '+08:00',
          ...configService.get('db.mysql'),
        }) as TypeOrmModuleOptions,
    }),
    RedisModule,
    MailerModule,
    LoggerModule.forRoot(),
  ],
  exports: [MailerModule],
})
export class ShareModule {}
