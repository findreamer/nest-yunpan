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
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { ExceptionsFilter } from './common/filter/exceptions-filter';
import { LoggerService } from './shared/logger/logger.service';
import cluster from 'node:cluster';
import { isMainProcess } from './global/env';

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
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
      // forbidNonWhitelisted: true, // 禁止 无装饰器验证的数据通过
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      stopAtFirstError: true,
      exceptionFactory: (errors) =>
        new UnprocessableEntityException(
          errors.map((e) => {
            const rule = Object.keys(e.constraints!)[0];
            const msg = e.constraints![rule];
            return msg;
          })[0],
        ),
    }),
  );

  setupSwagger(app, configService);
  app.listen(port ?? 3000, '0.0.0.0').then(async () => {
    app.useLogger(app.get(LoggerService));
    const url = await app.getUrl();
    const { pid } = process;
    const env = cluster.isPrimary;

    const prefix = env ? 'P' : 'W';
    if (!isMainProcess) {
      return;
    }

    const logger = new Logger('NestApplication');
    logger.log(`[${prefix + pid}] Server running on ${url}`);
    if (isDev) {
      logger.log(`[${prefix + pid}] OpenApi: ${url}/api-docs`);
    }
  });
}
bootstrap();
