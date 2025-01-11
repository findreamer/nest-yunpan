import { CommonEntity } from '@/common/entity/common.entity';
import { ClientEntity } from '@/DDD/client/entities/client.entity';
import { EmpEntity } from '@/DDD/emp/entities/emp.entity';
import { TenantEntity } from '@/DDD/tenant/entities/tenant.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contract', {
  comment: '合同表',
})
export class ContractEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.id)
  tenant: TenantEntity;

  @ManyToOne(() => ClientEntity, (client) => client.id)
  client: ClientEntity;

  @ManyToOne(() => EmpEntity, (emp) => emp.id)
  mng: EmpEntity;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '合同编号',
    unique: true,
    nullable: false,
  })
  num: string;

  @Column({
    type: 'char',
    length: 2,
    comment: '合同状态 0-草稿 1-生效 2-失效',
    default: '0',
    nullable: false,
  })
  status: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '合同名称',
    nullable: true,
  })
  name: string;
}
