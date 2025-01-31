import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { In, Repository } from 'typeorm';
import { isEmpty } from 'lodash';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}
  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }

  /**
   * 根据用户id查找角色信息
   * @param userId
   */
  async getRoleIdsByUser(userId: number): Promise<number[]> {
    const roles = await this.roleRepository.find({
      where: {
        users: {
          id: userId,
        },
      },
      select: ['id'],
    });

    if (!isEmpty(roles)) {
      return roles.map((role) => role.id);
    }
    return [];
  }

  async getRoleValues(ids: number[]): Promise<string[]> {
    return (
      await this.roleRepository.find({
        where: {
          id: In(ids),
        },
        select: ['value'],
      })
    ).map((role) => role.value);
  }
}
