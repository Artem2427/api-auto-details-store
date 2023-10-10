import { AppDataSource } from '@app/configs/data-source';
import { UserEntity } from '@app/user/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return this.findOne({ where: { email } });
  }
}
