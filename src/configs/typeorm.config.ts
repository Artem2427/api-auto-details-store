import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getPostgresConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    url: configService.get('DATABASE_URL'),
    ssl:
      configService.get('PROD') === 'true'
        ? {
            rejectUnauthorized: false,
          }
        : false,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
  };
};
