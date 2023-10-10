import { CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { StoreConfig } from 'cache-manager';
import * as redisStore from 'cache-manager-ioredis';

export const getRedisConfig = async (
  configService: ConfigService,
): Promise<CacheModuleOptions<StoreConfig>> => {
  return {
    store: redisStore,
    ttl: Number(configService.get('REDIS_DEFAULT_TTL')),
    host: configService.get('REDIS_HOST'),
    port: Number(configService.get('REDIS_PORT')),
    user: configService.get('REDIS_USER'),
    password: configService.get('REDIS_PASSWORD'),
  };
};
