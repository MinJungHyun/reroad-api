import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_KEY
    });
  }

  validate(payload) {
    console.log(`validate : [${payload.id}]${payload.email}`);
    return {
      email: payload.email,
      id: payload.id,
      role: payload.role
    };
  }
}
