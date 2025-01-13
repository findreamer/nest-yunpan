import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export abstract class CommonEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', comment: '创建时间' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', comment: '更新时间' })
  updatedAt: Date;

  @ApiProperty()
  @Exclude()
  @Column({
    name: 'create_by',
    update: false,
    comment: '创建者',
    nullable: true,
  })
  createBy: number;

  @ApiProperty()
  @Exclude()
  @Column({ name: 'update_by', comment: '更新者' })
  updateBy: number;

  @ApiProperty()
  @Exclude()
  @Column({ type: 'boolean', default: false, name: 'is_deleted' })
  isDeleted: boolean;
}

export enum CommonStatusEnum {
  ENABLE = 1,
  DISABLE = 0,
}
