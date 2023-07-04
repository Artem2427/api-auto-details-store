import { Entity } from 'typeorm';

import { BaseEntity } from '@app/shared/core/entity/base.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {}
