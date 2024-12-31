import { Global, Module } from '@nestjs/common';
import { MailerModule } from './mailer/mailer.module';

@Global()
@Module({
  imports: [MailerModule],
  exports: [MailerModule],
})
export class ShareModule {}
