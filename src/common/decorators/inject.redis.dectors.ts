import { Inject } from '@nestjs/common';

export const REDIS_CLIENT = Symbol('REDIS_CLIENT');

// 自定义注入redis的装饰器
export const InjectRedis = () => Inject(REDIS_CLIENT);
