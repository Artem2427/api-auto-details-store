import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { DatabaseModule } from '@app/database/database.module';
import { SessionSerializer } from './utils/serializer';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, SessionSerializer],
})
export class AuthModule {}
