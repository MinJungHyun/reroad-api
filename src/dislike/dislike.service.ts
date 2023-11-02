import { Injectable } from '@nestjs/common';
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type DislikeModel = Prisma.DislikeDelegate<RejectOptions>;
const { defaultOptions, getCrud } = new CrudOptions<DislikeModel>().setOptions(
  {},
);

@Injectable()
export class DislikeService extends getCrud<
  Prisma.DislikeGetPayload<typeof defaultOptions>
>() {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma.dislike, defaultOptions);
  }
}
