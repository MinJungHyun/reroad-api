import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './strategy/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';
import { JwtKakaoStrategy } from './strategy/jwt.kakao.strategy';
// import { JwtNaverStrategy } from './strategy/jwt.naver.strategy';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtGoogleStrategy } from './strategy/jwt.google.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule, JwtModule.register({}), PrismaModule],
  providers: [
    JwtAccessStrategy, //
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    // JwtNaverStrategy,
    JwtKakaoStrategy,
    AuthService,
    UserService
  ],
  controllers: [
    AuthController //
  ],
  exports: [AuthService]
})
export class AuthModule {}
