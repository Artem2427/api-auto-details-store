import { Module, CacheModule as NestCacheModule } from '@nestjs/common';
import { CacheService } from './cache.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRedisConfig } from '@app/configs/redis.config';

@Module({
  imports: [
    ConfigModule,
    NestCacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getRedisConfig,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
