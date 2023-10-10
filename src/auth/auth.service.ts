import { Injectable } from '@nestjs/common';

import { UserRepository } from '@app/database/repositories/user.repository';

import { UserGoogleDetails } from './dto/user-details.dto';
import { UserEntity } from '@app/user/entity/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async validateGoogleUser(
    googleUserDetails: UserGoogleDetails,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneByEmail(
      googleUserDetails.email,
    );

    if (user) {
      user.lastLogin = new Date();
      user.isActivated = true;

      return await this.userRepository.save(user);
    }

    const newUser = new UserEntity();

    Object.assign(newUser, googleUserDetails);
    newUser.lastLogin = new Date();
    newUser.isActivated = true;

    return await this.userRepository.save(newUser);
  }

  public async login(loginUserDto: LoginUserDto) {
    const users = await this.userRepository
      .createQueryBuilder('users')
      // .leftJoinAndSelect('users.activationCode', 'activationCode')
      .getMany();
    return users as any;
  }
}
