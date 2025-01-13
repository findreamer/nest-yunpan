import {
  Injectable,
  ConsoleLogger,
  ConsoleLoggerOptions,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Logger as WinstonLogger } from 'winston';
import { createLogger, format, transports, config } from 'winston';
import 'winston-daily-rotate-file';

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  VERBOSE = 'verbose',
}

@Injectable()
export class LoggerService extends ConsoleLogger {
  private winstonLogger: WinstonLogger;
  private readonly configService = new ConfigService();
  constructor(context: string, options?: ConsoleLoggerOptions) {
    super(context, options);

    this.initWinston();
  }

  protected get level(): LogLevel {
    return this.configService.get('app.logger.level', {
      infer: true,
    }) as LogLevel;
  }

  protected get maxFiles(): number {
    return this.configService.get('app.logger.maxFiles', { infer: true });
  }

  /**
   * 初始化 Winston 日志记录器。
   * 配置日志级别、格式和传输方式。
   * 在开发环境中，还会添加控制台输出。
   */
  protected initWinston(): void {
    // 创建一个 Winston 日志记录器实例
    this.winstonLogger = createLogger({
      // 使用 npm 风格的日志级别
      levels: config.npm.levels,
      // 定义日志的格式，包括错误堆栈、时间戳和 JSON 格式
      format: format.combine(
        format.errors({ stack: true }),
        format.timestamp(),
        format.json(),
      ),
      // 配置日志传输方式，这里使用了每日轮转文件
      transports: [
        new transports.DailyRotateFile({
          // 设置日志级别
          level: this.level,
          // 日志文件名，包含日期
          filename: 'logs/app.%DATE%.log',
          // 日期模式
          datePattern: 'YYYY-MM-DD',
          // 最大文件数
          maxFiles: this.maxFiles,
          // 日志格式，包含时间戳和 JSON 格式
          format: format.combine(format.timestamp(), format.json()),
          // 审计文件路径
          auditFile: 'logs/.audit/app.json',
        }),
        new transports.DailyRotateFile({
          // 设置日志级别为 ERROR
          level: LogLevel.ERROR,
          // 错误日志文件名，包含日期
          filename: 'logs/app-error.%DATE%.log',
          // 日期模式
          datePattern: 'YYYY-MM-DD',
          // 最大文件数
          maxFiles: this.maxFiles,
          // 日志格式，包含时间戳和 JSON 格式
          format: format.combine(format.timestamp(), format.json()),
          // 错误日志的审计文件路径
          auditFile: 'logs/.audit/app-error.json',
        }),
      ],
    });

    // 在开发环境中，添加控制台输出
    // if (isDev) {
    //   this.winstonLogger.add(
    //     new transports.Console({
    //       // 设置日志级别
    //       level: this.level,
    //       // 定义控制台输出的格式，包括简单格式和颜色
    //       format: format.combine(
    //         format.simple(),
    //         format.colorize({ all: true }),
    //       ),
    //     }),
    //   );
    // }
  }

  verbose(message: any, context?: string): void {
    super.verbose.apply(this, [message, context]);

    this.winstonLogger.log(LogLevel.VERBOSE, message, { context });
  }

  debug(message: any, context?: string): void {
    super.debug.apply(this, [message, context]);

    this.winstonLogger.log(LogLevel.DEBUG, message, { context });
  }

  log(message: any, context?: string): void {
    super.log.apply(this, [message, context]);

    this.winstonLogger.log(LogLevel.INFO, message, { context });
  }

  warn(message: any, context?: string): void {
    super.warn.apply(this, [message, context]);

    this.winstonLogger.log(LogLevel.WARN, message);
  }

  error(message: any, stack?: string, context?: string): void {
    super.error.apply(this, [message, stack, context]);

    const hasStack = !!context;
    this.winstonLogger.log(LogLevel.ERROR, {
      context: hasStack ? context : stack,
      message: hasStack ? new Error(message) : message,
    });
  }
}
