import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { MainModule } from './module/main/main.module';
import { ShareModule } from './shared/share.module';
import { TenantModule } from './DDD/tenant/tenant.module';
import { PostModule } from './DDD/post/post.module';
import { EmpModule } from './DDD/emp/emp.module';
import { OrgTypeModule } from './DDD/org-type/org-type.module';
import { OrgModule } from './DDD/org/org.module';
import { EmpPostModule } from './DDD/emp-post/emp-post.module';
import { ClientModule } from './DDD/client/client.module';
import { ProjectModule } from './DDD/project/project.module';
import { ProjectMemberModule } from './DDD/project-member/project-member.module';
import { ContractModule } from './DDD/contract/contract.module';
import { EffortRecordModule } from './DDD/effort-record/effort-record.module';

@Module({
  imports: [
    ShareModule,
    UserModule,
    MainModule,
    // DDD
    TenantModule,
    PostModule,
    EmpModule,
    EmpPostModule,
    OrgTypeModule,
    OrgModule,
    ClientModule,
    ContractModule,
    ProjectModule,
    ProjectMemberModule,
    EffortRecordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
