import { CommonEntity } from '@/common/entity/common.entity';
import { UserEntity } from '@/module/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  Relation,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity({
  name: 'sys_dept',
  comment: '部门表',
})
@Tree('materialized-path')
export class DeptEntity extends CommonEntity {
  @ApiProperty({
    description: '部门名称',
  })
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
    comment: '部门名称',
  })
  name: string;

  @ApiProperty({
    description: '部门排序',
  })
  @Column({
    nullable: true,
    default: 0,
    comment: '部门排序',
  })
  orderNo: number;

  @TreeChildren({ cascade: true })
  children: DeptEntity[];

  @TreeParent({
    onDelete: 'SET NULL',
  })
  parent?: DeptEntity;

  @ApiProperty({
    description: '部门成员',
  })
  @OneToMany(() => UserEntity, (user) => user.dept)
  users: Relation<UserEntity[]>;

  @ApiProperty({
    description: '部门负责人',
  })
  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({
    name: 'master_id',
  })
  master: Relation<UserEntity>;
}
