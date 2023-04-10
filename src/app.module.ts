import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { ConfigModule } from '@nestjs/config';
import { TagModule } from '@app/tag/tag.module';
import { DatabaseModule } from './database/database.module';
import { NodemailerModule } from './shared/nodemailer/nodemailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    NodemailerModule,
    DatabaseModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
