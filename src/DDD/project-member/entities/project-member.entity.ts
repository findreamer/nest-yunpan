import { CommonEntity } from '@/common/entity/common.entity';
import { EmpEntity } from '@/DDD/emp/entities/emp.entity';
import { ProjectEntity } from '@/DDD/project/entities/project.entity';
import { TenantEntity } from '@/DDD/tenant/entities/tenant.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('project_member', {
  comment: '项目成员表',
})
export class ProjectMemberEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.id)
  tenant: TenantEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.id)
  project: ProjectEntity;

  @ManyToOne(() => EmpEntity, (emp) => emp.id)
  emp: EmpEntity;

  @Column({
    type: 'smallint',
    comment: '项目成员角色 0-项目经理 1-项目成员',
    nullable: false,
  })
  estimateInvestRatio: number;
}
