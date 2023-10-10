import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response, Request } from 'express';

import { GoogleAuthGuard } from './guards/google-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { I18n, I18nContext } from 'nestjs-i18n';
import { DtoValidationPipe } from '@app/shared/core/pipes/dto-validation.pipe';
import { UUIDValidationPipe } from '@app/shared/core/pipes/uuid-validation.pipe';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Authorization via Google account',
    description: `
      **Purpose**:
      This endpoint initiates the OAuth2.0 flow for authorizing our application via a Google account.

      **Flow Explanation**:
      Once called, users will be redirected to Google's OAuth2.0 consent screen where they grant permissions to our application. Upon successful authorization, Google redirects the user back to our callback endpoint with an authorization code.

      **Expected Result**:
      On successful authorization, the user will receive an access token which can be used for subsequent API requests that require authentication.

      **Error Scenarios**:
      If the authorization fails, the user will be redirected back with an error message detailing the reason for failure.

      **Security**:
      We never access or store user passwords. The entire authentication is handled by Google.

      **Other Relevant Details**:
      Users need to have a Google account and should grant the necessary permissions for the authorization to be successful.
    `,
  })
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Login' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return { msg: 'Ok' };
  }

  @ApiOperation({ summary: 'Log in' })
  @ApiBody({ type: LoginUserDto })
  // @ApiOkResponse({ type: AccessTokenResponseDto, description: 'Log in' })
  @Post('login')
  @UsePipes(DtoValidationPipe)
  async logIn(
    @Res({ passthrough: true }) response: Response,
    @Body() loginUserDto: LoginUserDto,
  ): Promise<any> {
    const tokens = await this.authService.login(loginUserDto);

    response.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return { accessToken: tokens.accessToken };
  }

  @Get('status')
  user(@Req() request: Request) {
    if (request['user']) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }

  //Add to Headers Accept-Language = "uk" or "en"
  @ApiExcludeEndpoint()
  @Get()
  getHello(@I18n() i18n: I18nContext) {
    return i18n.t(`TR.here`);
  }
}
