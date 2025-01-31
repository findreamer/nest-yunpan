import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccessTokenEntity } from './access-token.entity';

@Entity({
  name: 'user_refresh_token',
  comment: '用户刷新令牌表',
})
export class RefreshTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 500,
    nullable: false,
  })
  value: string;

  @Column({ comment: '令牌过期时间' })
  expired_at!: Date;

  @CreateDateColumn({ comment: '令牌创建时间' })
  created_at!: Date;

  @OneToOne(
    () => AccessTokenEntity,
    (accessToken) => accessToken.refreshToken,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  accessToken: AccessTokenEntity;
}
