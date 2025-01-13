import { CommonEntity } from '@/common/entity/common.entity';
import { EmpEntity } from '@/DDD/emp/entities/emp.entity';
import { ProjectEntity } from '@/DDD/project/entities/project.entity';
import { TenantEntity } from '@/DDD/tenant/entities/tenant.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('effort_record', {
  comment: '工时记录表',
})
export class EffortRecordEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.id)
  tenant: TenantEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.id)
  project: ProjectEntity;

  @ManyToOne(() => EmpEntity, (emp) => emp.id)
  emp: EmpEntity;

  @Column({
    type: 'date',
    comment: '工作日期',
    nullable: false,
  })
  workDate: Date;

  @Column({
    type: 'decimal',
    comment: '工时',
    precision: 2,
    scale: 1,
    nullable: false,
  })
  effort: number;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '备注',
    nullable: true,
  })
  nodes: string;
}
