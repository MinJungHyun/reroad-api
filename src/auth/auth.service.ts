import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthServiceSetRefreshToken } from './interfaces/auth-service.interface';
import { UserService } from 'src/user/user.service';

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL || 'http://localhost:3000';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  getAccessToken({ ...user }): string {
    const accessToken = this.jwtService.sign(
      { email: user.email, sub: user.id, role: user.role },
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '2w' }
    );
    return accessToken;
  }

  setRefreshToken({ user, res, req }: IAuthServiceSetRefreshToken): string {
    const refreshToken = this.jwtService.sign({ sub: user.id }, { secret: process.env.JWT_REFRESH_KEY, expiresIn: '2w' });
    console.log('@@@@', refreshToken);

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
    const allowedOrigins = [FRONTEND_BASE_URL];
    const origin = req.headers.origin || '';

    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    );
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/; SameSite=None; Secure; httpOnly;`);

    return refreshToken;
  }
  async googleLogin({ req, res }) {
    const email: string = req.user.email || '';
    console.log('@@@1@', req.user);

    let user = await this.userService.findUserByEmail(email);
    if (!user)
      user = await this.userService.create({
        createUserInput: {
          email: email,
          name: req.user.name,
          password: req.user.providerId,
          image: req.user.image,
          phone: ''
        }
      });
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image
    };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME,
        secret: process.env.JWT_ACCESS_KEY
      })
    };
  }
  async OAuthLogin({ req, res }) {
    console.log(req.user);

    const email: string = req.user.email || '';
    let user = await this.userService.findUserByEmail(email);
    if (!user)
      user = await this.userService.create({
        createUserInput: {
          email: email,
          name: req.user.name,
          password: req.user.providerId,
          phone: ''
        }
      });

    this.setRefreshToken({ user, res, req });
    res.redirect(FRONTEND_BASE_URL);
    return 'done';
  }
  async getCurrentUser(token: string) {
    try {
      const decodedToken = this.jwtService.decode(token);
      return decodedToken;
    } catch (error) {
      // 토큰 해독에 실패한 경우 예외 처리
      throw new Error('Failed to get current user');
    }
  }
}
