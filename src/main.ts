if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as cookieParser from 'cookie-parser';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';
import * as session from 'express-session';
import * as passport from 'passport';

import { AppModule } from '@app/app.module';
import { AllExceptionFilter } from './shared/core/exception-filters/exception-filter';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonModule.createLogger({
      transports: [
        new transports.DailyRotateFile({
          filename: `logs/%DATE%-error.log`,
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          format: format.combine(format.timestamp(), format.json()),
          maxFiles: '30d',
        }),
        new transports.DailyRotateFile({
          filename: `logs/%DATE%-combined.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          format: format.combine(format.timestamp(), format.json()),
          maxFiles: '30d',
        }),
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            format.ms(),
            nestWinstonModuleUtilities.format.nestLike('Store API', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
  });

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionFilter());
  app.use(
    session({
      secret: 'some-secret-key',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // app.useGlobalFilters()

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Auto details store API')
    .setDescription(`<strong>Documentations REST API</strong>`) // customize using Html or markdown
    .setVersion('1.0.0')
    .addServer('http://localhost:5000')
    .addBearerAuth({
      type: 'http',
      description: 'Enter JWT token',
      scheme: 'bearer',
      name: 'Authorization',
      in: 'header',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(PORT);

  if (process.env.IS_TS_NODE) {
    console.log(`The server is starting on http://localhost:${PORT}/api/docs`);
  }
}
bootstrap();
