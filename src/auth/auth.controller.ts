import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: {
    name: string;
    email: string;
    password: string;
  };
}

const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN || 'localhost';
const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL || 'http://localhost:3000';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService, //
    private readonly authService: AuthService
  ) {}

  /**
   * Google Login
   */
  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    const token = await this.authService.googleLogin({ req, res });
    res.cookie('access_token', token.access_token, {
      maxAge: 2 * 60 * 60 * 1000,
      // sameSite: 'none'
      domain: COOKIE_DOMAIN
    });
    console.log('@@@', process.env.FRONTEND_BASE_URL);
    res.redirect(FRONTEND_BASE_URL);
  }

  /**
   * Kakao Login
   */
  @Get('/kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao() {}

  @Get('/kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async loginKakaoCallback(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    this.authService.OAuthLogin({ req, res });
  }

  /**
   * Naver Login
   */
  @Get('/naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    this.authService.OAuthLogin({ req, res });
  }

  @Get('favicon.ico')
  favicon(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    res.status(204).end();
  }
}
