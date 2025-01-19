import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { ShareModule } from './shared/share.module';
import { AuthModule } from './module/auth/auth.module';
import { RoleModule } from './module/system/role/role.module';
import { DeptModule } from './module/system/dept/dept.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [ShareModule, UserModule, AuthModule, RoleModule, DeptModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
