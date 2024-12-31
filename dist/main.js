"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filter/http-exception.filter");
const config_1 = require("@nestjs/config");
const interceptors_1 = require("./common/interceptors");
const utils_1 = require("./utils");
const setup_swagger_1 = require("./setup-swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const { port, prefix } = configService.get('app', { infer: true });
    app.setGlobalPrefix(prefix);
    app.enableCors({ origin: '*', credentials: true });
    if (utils_1.isDev) {
        app.useGlobalInterceptors(new interceptors_1.LoggerInterceptor());
    }
    else {
        app.enableShutdownHooks();
    }
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new interceptors_1.ResponseFormatterInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true, whitelist: true }));
    (0, setup_swagger_1.setupSwagger)(app, configService);
    await app.listen(port ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map