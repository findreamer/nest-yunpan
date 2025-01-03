import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { MainModule } from './module/main/main.module';
import { ShareModule } from './shared/share.module';

@Module({
  imports: [ShareModule, UserModule, MainModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
