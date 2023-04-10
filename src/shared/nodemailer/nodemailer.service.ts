import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as Hogan from 'hogan.js';
import * as path from 'path';

import { SendEmailInfoInterface } from './types/send-email.interface';

@Injectable()
export class NodemailerService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendLetter(infoObject: SendEmailInfoInterface): Promise<void> {
    try {
      var template = fs.readFileSync(
        path.resolve(__dirname, infoObject.filePath),
        {
          encoding: 'utf-8',
          flag: 'r',
        },
      );

      var compiledTemplate = Hogan.compile(template);

      this.mailerService
        .sendMail({
          from: `Store auto-details <${this.configService.get('SMTP_USER')}>`,
          to: infoObject.to,
          subject: infoObject.subject,
          html: compiledTemplate.render(infoObject.context),
        })
        .then((response) => {
          console.log(response, 'Email is sent');
        })
        .catch((error) => {
          console.log(error, 'Error sending email');
        });
    } catch (error) {
      throw new HttpException(
        'Something go wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
