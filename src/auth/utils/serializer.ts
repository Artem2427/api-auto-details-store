import { PassportSerializer } from '@nestjs/passport';

import { UserEntity } from '@app/user/entity/user.entity';
import { UserRepository } from '@app/database/repositories/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  serializeUser(user: UserEntity, done: Function) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    console.log(payload, 'payload');

    const user = await this.userRepository.findOne({
      where: { id: payload.id },
    });

    return user ? done(null, user) : done(null, null);
  }
}
