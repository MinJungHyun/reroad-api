import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from 'src/common/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from 'src/common/auth/jwt-refresh.strategy';
import { JwtKakaoStrategy } from 'src/common/auth/jwt.kakao.strategy';
// import { JwtNaverStrategy } from 'src/common/auth/jwt.naver.strategy';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtGoogleStrategy } from 'src/common/auth/jwt.google.strategy';

@Module({
  imports: [JwtModule.register({}), PrismaModule],
  providers: [
    JwtAccessStrategy, //
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    // JwtNaverStrategy,
    JwtKakaoStrategy,
    AuthService,
    UserService,
  ],
  controllers: [
    AuthController, //
  ],
  exports: [AuthService],
})
export class AuthModule {}
