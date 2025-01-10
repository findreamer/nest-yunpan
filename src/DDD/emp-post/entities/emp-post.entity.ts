import { CommonEntity } from '@/common/entity/common.entity';
import { TenantEntity } from '@/DDD/tenant/entities/tenant.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('emp_post', {
  comment: '员工岗位表',
})
export class EmpPostEntity extends CommonEntity {
  @PrimaryColumn({
    type: 'int',
    comment: '员工id',
  })
  empId: number;

  @PrimaryColumn({
    type: 'char',
    length: 10,
    comment: '岗位编码',
  })
  postCode: string;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.id)
  tenant: TenantEntity;
}
