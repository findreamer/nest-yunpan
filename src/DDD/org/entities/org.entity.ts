import { CommonEntity, CommonStatusEnum } from '@/common/entity/common.entity';
import { EmpEntity } from '@/DDD/emp/entities/emp.entity';
import { OrgTypeEntity } from '@/DDD/org-type/entities/org-type.entity';
import { TenantEntity } from '@/DDD/tenant/entities/tenant.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('org', {
  comment: '组织表',
})
export class OrgEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '组织名称',
  })
  name: string;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.id)
  tenant: TenantEntity;

  @ManyToOne(() => OrgEntity, (org) => org.id)
  superior: OrgEntity;

  @ManyToOne(() => OrgTypeEntity, (orgType) => orgType.code)
  orgType: OrgTypeEntity;

  @ManyToOne(() => EmpEntity, (emp) => emp.id)
  leader: EmpEntity;

  @Column({
    type: 'enum',
    default: CommonStatusEnum.ENABLE,
    enum: CommonStatusEnum,
    comment: '组织状态',
  })
  status: CommonStatusEnum;
}
