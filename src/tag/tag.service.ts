import { Injectable } from '@nestjs/common';
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type TagModel = Prisma.TagDelegate<RejectOptions>;
const { defaultOptions, getCrud } = new CrudOptions<TagModel>().setOptions({});

@Injectable()
export class TagService extends getCrud<
  Prisma.TagGetPayload<typeof defaultOptions>
>() {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma.tag, defaultOptions);
  }
}
