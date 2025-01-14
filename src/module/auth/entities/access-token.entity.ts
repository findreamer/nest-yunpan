import { UserEntity } from '@/module/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity({
  name: 'user_access_token',
  comment: '用户访问令牌表',
})
export class AccessTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 500,
  })
  value!: string;

  @Column({
    comment: '过期时间',
  })
  expired_at: Date;

  @CreateDateColumn({
    comment: '创建时间',
  })
  created_at: Date;

  @OneToOne(
    () => RefreshTokenEntity,
    (refreshToken) => refreshToken.accessToken,
    {
      cascade: true,
    },
  )
  refreshToken!: RefreshTokenEntity;

  @ManyToOne(() => UserEntity, (user) => user.access_tokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;
}
