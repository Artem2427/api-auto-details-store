import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getPostgresConfig } from '@app/configs/typeorm.config';
import { TagEntity } from '@app/tag/tag.entity';
import { TagRepository } from './repositories/tag.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),

    TypeOrmModule.forFeature([TagEntity]),
  ],
  providers: [TagRepository],
  exports: [TagRepository],
})
export class DatabaseModule {}
