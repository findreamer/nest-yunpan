import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { MainModule } from './module/main/main.module';
import { ShareModule } from './shared/share.module';
import { AuthModule } from './module/auth/auth.module';
import { RoleModule } from './module/system/role/role.module';
import { DeptModule } from './module/system/dept/dept.module';

@Module({
  imports: [
    ShareModule,
    UserModule,
    MainModule,
    AuthModule,
    RoleModule,
    DeptModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
