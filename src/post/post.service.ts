import { Injectable } from '@nestjs/common';
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type PostModel = Prisma.PostDelegate<RejectOptions>;
const { defaultOptions, getCrud } = new CrudOptions<PostModel>().setOptions({});

@Injectable()
export class PostService extends getCrud<
  Prisma.PostGetPayload<typeof defaultOptions>
>() {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma.post, defaultOptions);
  }

  async findAll1() {
    console.log('@@@@', 1);

    return 'asd';

    return this.prisma.post.findMany({
      include: {},
    });
  }
}
