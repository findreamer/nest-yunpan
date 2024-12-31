import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import configuration from './config';
import { MainModule } from './module/main/main.module';
import { ShareModule } from './shared/share.module';

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
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          closeClient: true,
          readyLog: true,
          errorLog: true,
          config: configService.get('redis'),
        };
      },
    }),
    ShareModule,
    UserModule,
    MainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
