import { Inject, Injectable } from '@nestjs/common';
import { TagRepository } from '@app/database/repositories/tag.repository';
import { CacheService } from '@app/shared/cache/cache.service';

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepository: TagRepository,
    @Inject(CacheService)
    private readonly cacheService: CacheService,
  ) {}
  async findAll(): Promise<any> {
    const cacheKey = this.cacheService.generateDynamicKey('tags', ['all']);
    const cacheData = await this.cacheService.get(cacheKey);
    if (cacheData) {
      return cacheData;
    }

    return await this.tagRepository.findAll();
  }

  async test() {
    this.cacheService.set(
      this.cacheService.generateDynamicKey('tags', ['all']),
      { a: 2, b: { c: 5 } },
      30,
    );
  }
}
