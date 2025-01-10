import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { API_SECURITY_AUTH } from '@/common/decorators/swagger.decorator';
import { CommonEntity } from './common/entity/common.entity';
import { ResOp } from './common/model/response';
import { Pagination } from '@/common/model';

export function setupSwagger(
  app: INestApplication,
  configService: ConfigService,
) {
  const { port, name } = configService.get('app');
  const { enable, title, description, path, version } =
    configService.get('swagger');

  if (!enable) {
    return;
  }

  const documentBuilder = new DocumentBuilder()
    .setTitle(title ?? name)
    .setDescription(description ?? `${title ?? name} API document`)
    .setVersion(version);

  documentBuilder.addSecurity(API_SECURITY_AUTH, {
    description: '输入令牌（Enter the token）',
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  });

  const document = SwaggerModule.createDocument(app, documentBuilder.build(), {
    ignoreGlobalPrefix: false,
    extraModels: [CommonEntity, ResOp, Pagination],
  });

  SwaggerModule.setup(path, app, document, {
    swaggerOptions: {
      // 开启登录认证
      persistAuthorization: true,
    },
  });

  setTimeout(() => {
    const logger = new Logger('Swagger');
    logger.log(`Document running on http://127.0.0.1:${port}/${path}`);
  }, 500);
}
