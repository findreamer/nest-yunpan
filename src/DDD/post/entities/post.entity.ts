import { CommonEntity } from '@/common/entity/common.entity';
import { TenantEntity } from '@/DDD/tenant/entities/tenant.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('post', {
  comment: '岗位表',
})
export class PostEntity extends CommonEntity {
  @PrimaryColumn({
    type: 'char',
    length: 10,
    comment: '岗位编码',
  })
  code: string;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.id)
  tenant: TenantEntity;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '岗位名称',
  })
  name: string;
}
