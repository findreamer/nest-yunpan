import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@/common/decorators/inject.redis.dectors';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import Redis from 'ioredis';

@Injectable()
export class UserService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByUsername(username: string): Promise<UserEntity | undefined> {
    return this.userRepository
      .createQueryBuilder()
      .where({
        username,
        status: 1,
      })
      .getOne();
  }
}
