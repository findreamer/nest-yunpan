import { CommonEntity, CommonStatusEnum } from '@/common/entity/common.entity';
import { OrgEntity } from '@/DDD/org/entities/org.entity';
import { TenantEntity } from '@/DDD/tenant/entities/tenant.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('emp', {
  comment: '员工表',
})
export class EmpEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.id)
  tenant: TenantEntity;

  @ManyToOne(() => OrgEntity, (org) => org.id)
  org: OrgEntity;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '工号',
  })
  num: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '身份证号',
  })
  idNum: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '姓名',
  })
  name: string;

  @Column({
    type: 'char',
    length: 2,
    comment: '性别',
    nullable: true,
  })
  gender: string;

  @Column({
    type: 'date',
    comment: '出生日期',
    nullable: true,
  })
  dob: Date;

  @Column({
    type: 'enum',
    default: CommonStatusEnum.ENABLE,
    enum: CommonStatusEnum,
    comment: '员工状态',
  })
  status: CommonStatusEnum;
}
