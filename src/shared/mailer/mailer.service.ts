import { Injectable } from '@nestjs/common';
import {
  MailerService as NestMailerService,
  ISendMailOptions,
} from '@nestjs-modules/mailer';
@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  public async sendMail(options: ISendMailOptions) {
    return new Promise((resolve, reject) => {
      this.mailerService
        .sendMail(options)
        .then(() => {
          resolve('ok');
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
