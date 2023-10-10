import {
  ArgumentMetadata,
  HttpException,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { REQUEST } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { I18nService } from 'nestjs-i18n';
import { ErrorTypesEnum } from '../enums/error-type.enum';

@Injectable()
export class DtoValidationPipe implements PipeTransform {
  constructor(
    private readonly i18n: I18nService,
    @Inject(REQUEST) private request: Request,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (metadata.type === 'body') {
      const obj = plainToClass(metadata.metatype, value);
      const errors = await validate(obj);
      const lang = this.request['lang'];

      if (errors.length) {
        const message = errors.map((error) => {
          return {
            field: error.property,
            error: Object.values(error.constraints)
              .map((error) => {
                const { key, args = {} } = JSON.parse(error);

                return this.i18n.t(key || '', {
                  lang,
                  args,
                });
              })
              .join(', '),
          };
        });

        throw new HttpException(
          {
            errors: message,
            errorType: ErrorTypesEnum.Validation,
            message: this.i18n.t('TR.EXCEPTIONS.BODY', {
              lang,
            }),
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return value;
  }
}
