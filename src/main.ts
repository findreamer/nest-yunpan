import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import {
  ResponseFormatterInterceptor,
  LoggerInterceptor,
} from './common/interceptors';
// import { join } from 'node:path';
import { isDev } from './utils';
import { setupSwagger } from './setup-swagger';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionsFilter } from './common/filter/exceptions-filter';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  const configService = app.get(ConfigService);
  const { port, prefix } = configService.get('app', { infer: true });
  app.setGlobalPrefix(prefix);
  app.enableCors({ origin: '*', credentials: true });
  // app.useStaticAssets({ root: join(__dirname, '..', 'public') });

  if (isDev) {
    app.useGlobalInterceptors(new LoggerInterceptor());
  } else {
    app.enableShutdownHooks();
  }

  // 注册全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new ExceptionsFilter());
  // 注册全局拦截器
  app.useGlobalInterceptors(new ResponseFormatterInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  setupSwagger(app, configService);
  await app.listen(port ?? 3000);
}
bootstrap();
