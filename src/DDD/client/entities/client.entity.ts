import { CommonEntity } from '@/common/entity/common.entity';
import { EmpEntity } from '@/DDD/emp/entities/emp.entity';
import { TenantEntity } from '@/DDD/tenant/entities/tenant.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('client', {
  comment: '客户表',
})
export class ClientEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.id)
  tenant: TenantEntity;

  @ManyToOne(() => EmpEntity, (emp) => emp.id)
  @JoinTable({
    name: 'mng_id',
  })
  mng: EmpEntity;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '客户名称',
  })
  name: string;
}
