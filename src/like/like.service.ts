import { Injectable } from '@nestjs/common';
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type LikeModel = Prisma.LikeDelegate<RejectOptions>;
const { defaultOptions, getCrud } = new CrudOptions<LikeModel>().setOptions({});

@Injectable()
export class LikeService extends getCrud<
  Prisma.LikeGetPayload<typeof defaultOptions>
>() {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma.like, defaultOptions);
  }
}
