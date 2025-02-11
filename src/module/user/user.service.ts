import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@/common/decorators/inject.redis.dectors';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/user.dto';
import { UpdateDeptDto } from '../system/dept/dto/update-dept.dto';
import { RegisterDto } from '../auth/dto/auth.dto';
import { isEmpty } from 'lodash';
import Redis from 'ioredis';
import { BizException } from '@/common/exceptions/biz.exception';
import { ErrorEnum } from '@/common/constant';
import { md5, randomValue } from '@/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
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

  /**
   *
   * @param dto
   */
  async register(dto: RegisterDto) {
    const { username, ...data } = dto;
    const exists = await this.userRepository.findOneBy({ username });

    if (!isEmpty(exists)) {
      throw new BizException(ErrorEnum.SYSTEM_USER_EXISTS);
    }

    await this.entityManager.transaction(async (manager) => {
      const salt = randomValue(32);
      const password = md5(`${data.password ?? 'a123456'}${salt}`);
      const u = manager.create(UserEntity, {
        username,
        password,
        status: 1,
        paslt: salt,
      });

      const user = await manager.save(u);
      return user;
    });
  }
}
