import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import {
  ResponseFormatterInterceptor,
  LoggerInterceptor,
} from './common/interceptors';
import { join } from 'node:path';
import { isDev } from './utils';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  const configService = app.get(ConfigService);
  const { port, prefix } = configService.get('app', { infer: true });
  app.setGlobalPrefix(prefix);
  app.enableCors({ origin: '*', credentials: true });
  app.useStaticAssets({ root: join(__dirname, '..', 'public') });

  if (isDev) {
    app.useGlobalInterceptors(new LoggerInterceptor());
  } else {
    app.enableShutdownHooks();
  }

  // 注册全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 注册全局拦截器
  app.useGlobalInterceptors(new ResponseFormatterInterceptor());
  await app.listen(port ?? 3000);
}
bootstrap();
