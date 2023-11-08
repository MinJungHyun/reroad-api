import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as shortid from 'shortid';

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
    const { email, password, name, phone } = createUserInput;

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
        name,
        type: 'user',
        role: '',
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
      id: id,
      ...user,
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
}
