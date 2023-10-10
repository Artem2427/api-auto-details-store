import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorTypesEnum } from '../enums/error-type.enum';

@Catch(HttpException)
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status !== HttpStatus.INTERNAL_SERVER_ERROR) {
      const exceptionResponse = exception.getResponse();

      console.log(exceptionResponse, 'exceptionResponse');

      response.status(status).json({
        statusCode: status,
        errorType: exceptionResponse['errorType'] ?? ErrorTypesEnum.BadRequest,
        timestamp: new Date().toISOString(),
        message: exception.message,
        errors: exceptionResponse['errors'] || [],
        path: request.url,
      });
      return;
    }

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
