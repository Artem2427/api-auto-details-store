import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  public generateDynamicKey(prefix: string, ...args: any[]): string {
    return `${prefix}:${args.join(':')}`;
  }

  public async getAllKeys(): Promise<any> {
    return await this.cacheManager.store.keys();
  }

  public async set<T>(key: string, data: T, ttl?: number): Promise<void> {
    const options: CachingConfig = {};

    if (ttl) {
      options.ttl = ttl;
    }

    this.cacheManager.set(key, JSON.stringify(data), options, (error) => {
      console.error(error, 'error');
    });
  }

  public async get<T>(key: string): Promise<T | null> {
    const data: unknown = await this.cacheManager.get(key);

    if (!data) return null;

    let obj: T | null;
    try {
      obj = JSON.parse(data.toString()) as T;
    } catch (error) {
      obj = null;
    }

    return obj;
  }

  public async del(key: string): Promise<void> {
    return await this.cacheManager.del(key);
  }

  public async reset(): Promise<void> {
    return await this.cacheManager.reset();
  }
}
