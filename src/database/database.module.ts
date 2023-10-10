import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getPostgresConfig } from '@app/configs/typeorm.config';
import { TagEntity } from '@app/tag/tag.entity';
import { UserEntity } from '@app/user/entity/user.entity';

import { TagRepository } from './repositories/tag.repository';
import { UserRepository } from './repositories/user.repository';

@Global()
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),

    TypeOrmModule.forFeature([TagEntity, UserEntity]),
  ],
  providers: [TagRepository, UserRepository],
  exports: [TagRepository, UserRepository],
})
export class DatabaseModule {}
