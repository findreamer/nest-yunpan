import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { InjectRedis } from '@/common/decorators/inject.redis.dectors';
import Redis from 'ioredis';

@Injectable()
export class UserService {
  private redis: Redis;
  constructor(
    @InjectRedis()
    private readonly redisService: Redis,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
