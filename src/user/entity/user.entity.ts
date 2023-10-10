import { ApiProperty } from '@nestjs/swagger';

import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity, Index } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserRolesEnum } from '@app/shared/core/enums/user-roles.enum';
import { BaseEntity } from '@app/shared/core/entities/base.entity';
import { AccountStatus } from '@app/shared/core/enums/account-status.enum';

@Entity({ name: 'users' })
@Index(['email', 'role', 'accountStatus', 'isSubscribe'])
export class UserEntity extends BaseEntity {
  @ApiProperty({ type: String })
  @Column({ type: 'timestamptz', nullable: true })
  registrationDate: Date;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: 70, nullable: true })
  @Exclude()
  password: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @ApiProperty({ type: Boolean })
  @Column({ type: 'bool', default: false })
  isActivated: boolean;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: true })
  forgotPasswordLink: string;

  @ApiProperty({ type: String })
  @Column({ type: 'timestamptz', nullable: true })
  expiredForgotPasswordDate: Date;

  @ApiProperty({ enum: UserRolesEnum })
  @Column({
    type: 'enum',
    enum: UserRolesEnum,
    default: UserRolesEnum.Guest,
  })
  role: UserRolesEnum;

  @ApiProperty({ enum: AccountStatus })
  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.Inactive,
  })
  accountStatus: AccountStatus;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: 200, nullable: true, unique: true })
  userName: string;

  @ApiProperty({ type: String })
  @Column({ type: 'timestamptz', nullable: true })
  dataOfBorn: Date;

  @ApiProperty({ type: Boolean })
  @Column({ type: 'bool', default: false })
  isSubscribe: boolean;

  @ApiProperty({ type: String })
  @Column({ type: 'timestamptz' })
  lastLogin: Date;

  @ApiProperty({ type: String })
  @Column({ type: 'timestamptz', nullable: true })
  deletedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
