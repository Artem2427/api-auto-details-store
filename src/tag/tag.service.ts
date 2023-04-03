import { Injectable } from '@nestjs/common';
import { TagEntity } from './tag.entity';
import { TagRepository } from '@app/database/repositories/tag.repository';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}
  async findAll(): Promise<TagEntity[]> {
    return await this.tagRepository.findAll();
  }
}
