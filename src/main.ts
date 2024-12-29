import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import { ResponseFormatterInterceptor } from './common/interceptors/response-formatter.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const prefix = configService.get('app.prefix');
  const port = configService.get('app.port');
  app.setGlobalPrefix(prefix);
  app.enableCors();

  // 注册全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseFormatterInterceptor());
  await app.listen(port ?? 3000);
}
bootstrap();
