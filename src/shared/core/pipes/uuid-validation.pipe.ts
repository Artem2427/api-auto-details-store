import {
  ArgumentMetadata,
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';
import validator from 'validator';
import { IS_UUID } from '../common-errors-message';

@Injectable()
export class UUIDValidationPipe implements PipeTransform {
  constructor(
    private readonly i18n: I18nService,
    @Inject(REQUEST) private request: Request,
  ) {}

  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') {
      return value;
    }

    if (!validator.isUUID(value, 'all')) {
      const { key, args = {} } = JSON.parse(IS_UUID);

      throw new BadRequestException(
        this.i18n.t(key || '', {
          lang: this.request['lang'],
          args,
        }),
      );
    }

    return value;
  }
}
