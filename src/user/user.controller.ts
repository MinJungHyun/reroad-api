import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserInput } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
@ApiTags('유저 API')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  //----------------- 조회 -----------------------//
  @Get('/')
  @ApiOperation({
    summary: '유저 전체 조회',
    description: '유저 전체 조회 API',
  })
  async fetchAllUser() {
    return await this.userService.fetchAll();
  }

  @Get('/:id')
  @ApiOperation({
    summary: '유저 단일 조회',
    description: '유저 단일 조회 API',
  })
  async fetchUser(@Param('id') id: number) {
    return await this.userService.fetch(id);
  }

  //----------------- 생성 -----------------------//
  @Post('/register')
  @ApiOperation({ summary: '유저 생성', description: '유저 생성 API' })
  async createUser(@Body() createUserInput: CreateUserInput) {
    const result = await this.userService.create({ createUserInput });

    return {
      statusCode: 200,
      message: '회원 가입 성공',
      data: {
        email: result.email,
        name: result.name,
        phone: result.phone,
        uid: result.uid,
      },
    };
  }

  //----------------- 업데이트 -----------------------//
  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '유저 업데이트', description: '유저 업데이트 API' })
  async updateUser(
    @Body() updateUserInput: UpdateUserInput,
    @Param('id') id: number,
  ) {
    return await this.userService.update({ id, updateUserInput });
  }

  //----------------- 탈퇴 -----------------------//
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '유저 탈퇴', description: '유저 탈퇴 API' })
  async deleteUser(@Param('id') id: number) {
    return await this.userService.delete({ id });
  }

  //내정보
  @Post('/info')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Req() request: any) {
    const token = request.headers.authorization.split(' ')[1]; // 예시: Bearer 토큰에서 실제 토큰 추출
    const currentUser: any = await this.authService.getCurrentUser(token);
    const user: any = await this.userService.findUserByEmail(
      currentUser?.email,
    );
    return {
      statusCode: 200,
      message: '내 정보 조회',
      data: {
        email: user?.email,
        name: user?.name,
        uid: user?.uid,
        iat: currentUser?.iat,
        exp: currentUser?.exp,
      },
    };
  }

  //회원정보
  @Get('/info/:uid')
  async getUserInfo(@Param('uid') uid: string) {
    const user: any = await this.userService.fetchByUid(uid);
    return {
      statusCode: 200,
      message: '회원 정보 조회',
      data: {
        email: user.email,
        name: user.name,
        uid: user.uid,
      },
    };
  }

  //회원가입 여부 체크
  @Get('/check/:email')
  async checkUser(@Param('email') email: string) {
    const result = await this.userService.findUserByEmail(email);
    return {
      statusCode: 200,
      message: '회원 가입 여부 확인',
      data: {
        isExist: result ? true : false,
      },
    };
  }

  //로그인
  @Post('/login')
  async login(@Body() body: { email: string; password: string }) {
    const user: any = await this.userService.login(body);

    const access_token = await this.authService.getAccessToken(user);
    return {
      statusCode: 200,
      message: '로그인 성공',
      data: {
        email: user.email,
        name: user.name,
        uid: user.uid,
        access_token: access_token,
      },
    };
  }
}
