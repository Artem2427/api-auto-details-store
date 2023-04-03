import { Module, CacheModule as NestCacheModule } from '@nestjs/common';
import { CacheService } from './cache.service';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    NestCacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 60 * 60,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
