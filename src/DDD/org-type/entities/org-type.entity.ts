import { CommonEntity, CommonStatusEnum } from '@/common/entity/common.entity';
import { TenantEntity } from '@/DDD/tenant/entities/tenant.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('org_type', {
  comment: '组织类型表',
})
export class OrgTypeEntity extends CommonEntity {
  @PrimaryColumn({
    type: 'char',
    length: 10,
    comment: '组织类型编码',
  })
  code: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '组织类型名称',
  })
  name: string;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.id)
  tenant: TenantEntity;

  @Column({
    type: 'enum',
    default: CommonStatusEnum.ENABLE,
    enum: CommonStatusEnum,
    comment: '组织类型状态',
  })
  status: CommonStatusEnum;
}
