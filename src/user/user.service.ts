import { Injectable } from '@nestjs/common';
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type UserModel = Prisma.UserDelegate<RejectOptions>;
const { defaultOptions, getCrud } = new CrudOptions<UserModel>().setOptions({});

@Injectable()
export class UserService extends getCrud<
  Prisma.UserGetPayload<typeof defaultOptions>
>() {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma.user, defaultOptions);
  }
}
