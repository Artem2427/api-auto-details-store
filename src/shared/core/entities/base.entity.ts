import { ApiProperty } from '@nestjs/swagger';
import { Column, Index, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  @ApiProperty({ type: String })
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: String })
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ type: String })
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
