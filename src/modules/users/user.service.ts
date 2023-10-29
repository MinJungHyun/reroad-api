import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async findUserByEmail(email: string) {
    const result = await this.prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        // imageUser: true,
      },
    });
    console.log('userservice.findUserByEmail', result);

    return result;
  }

  async create({ createUserInput }) {
    const { email, password, ...rest } = createUserInput;

    const user = await this.prisma.user.findFirst({ where: { email } });
    if (user) throw new ConflictException('이미 가입된 이메일입니다');

    /* 유저 이미지를 등록했다면 */
    // let img;
    // if (imageUser) {
    //   img = await this.prisma.image.save({
    //     url: imageUser,
    //   });
    // }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await this.prisma.user.create({
      email,
      // imageUser: img,
      password: hashedPassword,
      ...rest,
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
}
