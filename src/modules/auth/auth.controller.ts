import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: {
    name: string;
    email: string;
    password: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UserService, //
    private readonly authService: AuthService,
  ) {}

  //-----------------------구글 로그인-----------------------------//
  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authService.OAuthLogin({ req, res });
  }

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async loginGoogleCallback(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    console.log('@@@@', req);
    console.log('@@@@', res);

    this.authService.OAuthLogin({ req, res });
  }

  //-----------------------카카오 로그인-----------------------------//
  @Get('/kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao() {}

  @Get('/kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async loginKakaoCallback(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authService.OAuthLogin({ req, res });
  }

  //-----------------------네이버 로그인-----------------------------//
  @Get('/naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authService.OAuthLogin({ req, res });
  }

  @Get('favicon.ico')
  favicon(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    res.status(204).end();
  }
}
