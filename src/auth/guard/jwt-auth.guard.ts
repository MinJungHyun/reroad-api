import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { CustomUnauthorizedException } from '../auth.exception';
export const AUTH_JWT_GUARD_TYPE = 'jwt';
@Injectable()
export class JwtAuthGuard extends AuthGuard(AUTH_JWT_GUARD_TYPE) {
  private readonly jwtService = new JwtService();
  constructor(private reflector: Reflector) {
    super();
  }

  override async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new CustomUnauthorizedException('You are not authorized to access this resource.');

      return false; // JWT 토큰이 존재하지 않거나 형식이 잘못된 경우 인증 실패
    }

    const flag = await super.canActivate(context);

    if (flag) {
      const req = this.getRequest(context);
      const accessToken = req.headers.authorization.replace('Bearer ', '');

      // console.log(accessToken);
      const payload = (await this.jwtService.decode(accessToken)) as any;

      const exp = new Date(0);
      exp.setUTCSeconds(payload?.exp);

      const currentTime = new Date();
      const diffSecond = exp.getTime() - currentTime.getTime();
      if (diffSecond < 0) {
        throw new UnauthorizedException('EXPIRED_TOKEN');
      }
    }
    return flag;
  }
}
