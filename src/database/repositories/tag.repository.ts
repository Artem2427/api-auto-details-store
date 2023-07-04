import { TagEntity } from '@app/tag/tag.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagRepository {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async findAll(): Promise<TagEntity[]> {
    return await this.tagRepository.find();
  }
}

// @EntityRepository(User)
// export class UserRepository extends Repository<User> {
//   // расширьте базовые методы здесь
//   async findByName(name: string): Promise<User> {
//     return this.createQueryBuilder('user')
//       .where('user.name = :name', { name })
//       .getOne();
//   }
// }
