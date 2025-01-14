import { CommonEntity } from '@/common/entity/common.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
@Entity({
  name: 'sys_user',
  comment: '用户表',
})
export class UserEntity extends CommonEntity {
  @Column({
    type: 'varchar',
    length: 32,
    unique: true,
    comment: '用户名',
  })
  username: string;

  @Exclude()
  @Column({
    type: 'varchar',
    comment: '密码',
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 32,
  })
  paslt: string;

  @Column({
    type: 'varchar',
    comment: '昵称',
    nullable: true,
  })
  nickname: string;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: '头像',
  })
  avatar: string;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: 'QQ号',
  })
  qq: string;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: '邮箱',
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: '手机号',
  })
  phone: string;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: '备注',
  })
  remark: string;

  @Column({
    type: 'tinyint',
    comment: '状态 0:禁用 1:启用',
    default: 1,
    nullable: true,
  })
  status: number;

  // todo: 角色
  // todo: 权限
  // todo: 部门
  // todo: 岗位
  // todo: 菜单
  // todo: 按钮
}
