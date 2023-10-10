import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  IS_EMAIL,
  IS_REQUIRED,
  IS_STRING,
  MIN_LENGTH,
} from '@app/shared/core/common-errors-message';

export class LoginUserDto {
  @ApiProperty({ type: String, name: 'email', required: true })
  @IsNotEmpty({ message: IS_REQUIRED })
  @IsEmail({}, { message: IS_EMAIL })
  readonly email: string;

  @ApiProperty({ type: String, name: 'password', required: true, minLength: 5 })
  @IsNotEmpty({ message: IS_REQUIRED })
  @IsString({ message: IS_STRING })
  @MinLength(5, { message: MIN_LENGTH(5) })
  readonly password: string;
}
