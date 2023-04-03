import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { DatabaseModule } from '@app/database/database.module';
import { CacheModule } from '@app/shared/cache/cache.module';

@Module({
  imports: [DatabaseModule, CacheModule],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
