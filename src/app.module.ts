import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

import { AppController } from '@app/app.controller';
import { TagModule } from '@app/tag/tag.module';
import { AppService } from '@app/app.service';
import { DatabaseModule } from './database/database.module';
import { NodemailerModule } from './shared/nodemailer/nodemailer.module';
import { RequestLoggerMiddleware } from './shared/core/middlewares/request-logger.middleware';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { AuthMiddleware } from './auth/middleware/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PassportModule.register({ session: true }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    NodemailerModule,
    DatabaseModule,
    TagModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
    // consumer.apply(...[RequestLoggerMiddleware]).forRoutes('*');
  }
}
