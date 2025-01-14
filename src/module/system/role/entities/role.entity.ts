import { CommonEntity } from '@/common/entity/common.entity';
import { UserEntity } from '@/module/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, Relation } from 'typeorm';

@Entity({
  name: 'sys_role',
  comment: '角色表',
})
export class RoleEntity extends CommonEntity {
  @ApiProperty({
    description: '角色名称',
  })
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    comment: '角色名称',
  })
  name: string;

  @ApiProperty({
    description: '角色标识',
  })
  @Column({
    type: 'varchar',
    length: 10,
    unique: true,
    comment: '角色标识',
  })
  value: string;

  @ApiProperty({
    description: '角色描述',
  })
  @Column({
    type: 'varchar',
    length: 100,
    comment: '角色描述',
  })
  remark: string;

  @ApiProperty({
    description: '状态 0:禁用 1:启用',
  })
  @Column({
    type: 'tinyint',
    default: 1,
    nullable: true,
    comment: '状态 0:禁用 1:启用',
  })
  status: number;

  @ApiProperty({
    description: '是否为默认角色',
  })
  @Column({
    type: 'boolean',
    comment: '是否为默认角色',
    nullable: true,
  })
  default: boolean;

  @ManyToMany(() => UserEntity, (user) => user.roles, {})
  users: Relation<UserEntity[]>;

  // todo: menus
}
