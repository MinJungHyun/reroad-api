import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as shortid from 'shortid';
import { EncryptUtil } from 'src/common/utils/encrypt-utils';
import {
  RequestTokenValidation,
  RequestTokenValidationStatus,
} from 'src/auth/auth.types';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async fetchAll() {
    const result = await this.prisma.user.findMany({});
    return result;
  }

  async fetch(id: number) {
    const result = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return result;
  }

  async fetchByUid(uid: string) {
    const result = await this.prisma.user.findMany({
      where: {
        uid,
      },
    });
    return result[0];
  }

  async findUserByEmail(email: string) {
    const result = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    console.log('userservice.findUserByEmail', result);

    return result;
  }

  async create({ createUserInput }) {
    const { email, password, username } = createUserInput;

    const user = await this.prisma.user.findFirst({ where: { email } });
    if (user) throw new ConflictException('이미 가입된 이메일입니다');

    // uid 부여
    let uid = shortid.generate();
    let isUidExist = await this.prisma.user.findFirst({ where: { uid } });
    while (isUidExist != null) {
      uid = shortid.generate();
      isUidExist = await this.prisma.user.findFirst({ where: { uid } });
    }

    /* 유저 이미지를 등록했다면 */
    // let img;
    // if (imageUser) {
    //   img = await this.prisma.image.save({
    //     url: imageUser,
    //   });
    // }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 유저 생성
    const result = await this.prisma.user.create({
      data: {
        email,
        username,
        type: 'user',
        uid: uid,
        phone: phone,
        password: hashedPassword,
      },
    });

    return result;
  }

  async update({ id, updateUserInput }) {
    const { ...user } = updateUserInput;

    const result = await this.prisma.user.update({
      where: { id },
      data: user,
    });

    return result;
  }

  async delete({ id }) {
    return await this.prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
  }

  async login({ email, password }) {
    // add user type
    const user = await this.prisma.user.findFirst({ where: { email } });

    if (!user) throw new ConflictException('가입되지 않은 이메일입니다');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new ConflictException('비밀번호가 틀렸습니다');

    return user;
  }

  async setBusiness(id: number) {
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        type: 'business',
      },
    });
  }

  //validate token
  async validateToken(token: string): Promise<RequestTokenValidation> {
    console.log('validateToken:', token);
    const dec = EncryptUtil.TwoWay.decrypt(token);

    const [userId, timestamp] = dec.split('^');
    const now = Date.now();
    if (now - +timestamp > 1000 * 60 * 60 * 24 * 7) {
      // 7일
      return {
        status: RequestTokenValidationStatus.EXPIRED,
        message: '만료된 토큰',
        targetId: +userId,
        timestamp: +timestamp,
      };
    }
    const res = await this.prisma.user.findFirst({
      where: {
        id: +userId,
      },
    });
    if (!res) {
      return {
        status: RequestTokenValidationStatus.INVALID,
        message: '유효하지 않은 토큰',
        targetId: +userId,
        timestamp: +timestamp,
      };
    }

    //TODO :: 작성 되면 유효하지 않다고 보내기
    return {
      status: RequestTokenValidationStatus.VALID,
      message: '유효한 토큰',
      targetId: +userId,
      timestamp: +timestamp,
    };
  }

  async resetPassword(userId: number, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    //기존 비밀번호 찾기
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (user?.password === hashedPassword) {
      return {
        statusCode: 400,
        message: '기존 비밀번호와 동일합니다.',
        data: {},
      };
    }

    const result = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });
    if (result) {
      return {
        statusCode: 200,
        message: '비밀번호 변경 성공',
        data: {},
      };
    } else {
      return {
        statusCode: 400,
        message: '비밀번호 변경 실패',
        data: {},
      };
    }
  }
}
