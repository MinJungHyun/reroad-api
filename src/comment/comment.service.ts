import { Injectable } from '@nestjs/common';
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type CommentModel = Prisma.CommentDelegate<RejectOptions>;
const { defaultOptions, getCrud } = new CrudOptions<CommentModel>().setOptions(
  {},
);

@Injectable()
export class CommentService extends getCrud<
  Prisma.CommentGetPayload<typeof defaultOptions>
>() {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma.comment, defaultOptions);
  }
}
