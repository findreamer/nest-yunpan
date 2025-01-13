import { CommonEntity, CommonStatusEnum } from '@/common/entity/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tenant', {
  comment: '租户表',
})
export class TenantEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '租户名称',
  })
  name: string;

  @Column({
    type: 'enum',
    default: CommonStatusEnum.ENABLE,
    enum: CommonStatusEnum,
    comment: '租户状态',
  })
  status: CommonStatusEnum;
}
