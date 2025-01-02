import { Injectable } from '@nestjs/common';
import {
  MailerService as NestMailerService,
  ISendMailOptions,
} from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class MailerService {
  constructor(
    private readonly mailerService: NestMailerService,
    private readonly configService: ConfigService,
  ) {}

  public async sendMail(options: ISendMailOptions) {
    const { auth } = this.configService.get('email');
    const from = auth?.user ?? '';
    return this.mailerService.sendMail({
      from,
      ...options,
    });
  }
}
