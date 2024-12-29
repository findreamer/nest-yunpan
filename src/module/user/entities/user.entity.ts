import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';
@Entity({
  name: 'user_info',
})
export class User {
  @PrimaryGeneratedColumn({
    comment: '用户ID',
  })
  user_id: string;

  @Column({
    type: 'varchar',
    comment: '用户名',
    length: 20,
  })
  @Index({
    unique: true,
  })
  nick_name: string;

  @Column({
    type: 'varchar',
    comment: '用户邮箱',
    length: 50,
  })
  @Index({
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    comment: 'QQ OpenId',
    length: 35,
  })
  @Index({
    unique: true,
  })
  qq_open_id: string;

  @Column({
    type: 'varchar',
    comment: 'QQ 头像',
    length: 255,
  })
  qq_avatar: string;

  @Column({
    type: 'varchar',
    comment: '密码',
    length: 32,
  })
  password: string;

  @Column({
    type: 'datetime',
    comment: '加入时间',
  })
  join_time: Date;

  @Column({
    type: 'datetime',
    comment: '最后登录时间',
  })
  last_login_time: Date;

  @Column({
    type: 'tinyint',
    comment: '状态 0:禁用 1:启用',
  })
  status: number;

  @Column({
    type: 'bigint',
    comment: '使用空间',
  })
  use_space: bigint;

  @Column({
    type: 'bigint',
    comment: '总空间',
  })
  total_space: bigint;
}
