import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@/common/decorators/inject.redis.dectors';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import Redis from 'ioredis';
import { CreateUserDto } from './dto/user.dto';
import { UpdateDeptDto } from '../system/dept/dto/update-dept.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return 'this is a test';
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateDeptDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return this.userRepository.update(id, { status: 0 });
  }

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
