import { CommonEntity } from '@/common/entity/common.entity';
import { ContractEntity } from '@/DDD/contract/entities/contract.entity';
import { EmpEntity } from '@/DDD/emp/entities/emp.entity';
import { TenantEntity } from '@/DDD/tenant/entities/tenant.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum ProjectStatusEnum {
  DRAFT = '0',
  EFFECTIVE = '1',
  INVALID = '2',
}

@Entity('project', {
  comment: '项目表',
})
export class ProjectEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.id)
  tenant: TenantEntity;

  @ManyToOne(() => ContractEntity, (contract) => contract.id)
  contracrt: ContractEntity;

  @ManyToOne(() => EmpEntity, (emp) => emp.id)
  mng: EmpEntity;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '项目编号',
    unique: true,
    nullable: false,
  })
  num: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '项目名称',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'enum',
    comment: '项目状态 0-草稿 1-生效 2-失效',
    default: '0',
    enum: ProjectStatusEnum,
    nullable: false,
  })
  status: ProjectStatusEnum;
}
