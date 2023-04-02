import { DataSource } from 'typeorm';
import { getPostgresConfig } from './typeorm.config';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl:
    process.env.PROD === 'true'
      ? {
          rejectUnauthorized: false,
        }
      : false,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
});
