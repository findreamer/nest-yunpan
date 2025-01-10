import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'email_code',
})
export class EmailCodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    comment: '邮箱',
    length: 150,
  })
  @Index({
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    comment: '验证码',
    length: 4,
  })
  @Index({
    unique: true,
  })
  code: string;

  @Column({
    type: 'datetime',
    comment: '创建时间',
  })
  create_time: Date;

  @Column({
    type: 'tinyint',
    comment: '状态 0:未使用 1:已使用',
  })
  status: number;

  @Column({
    type: 'varchar',
    comment: 'uuid',
    length: 36,
  })
  uuid: string;
}
