import { Global, Module, Provider } from '@nestjs/common';
import {
  RedisModule as NestRedisModule,
  RedisService,
} from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { REDIS_CLIENT } from '@/common/decorators/inject.redis.dectors';

const providers: Provider[] = [
  {
    provide: REDIS_CLIENT,
    useFactory: (redisService: RedisService) => {
      return redisService.getOrThrow();
    },
    inject: [RedisService],
  },
];

@Global()
@Module({
  imports: [
    NestRedisModule.forRootAsync({
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
  ],
  providers,
  exports: [...providers],
})
export class RedisModule {}
