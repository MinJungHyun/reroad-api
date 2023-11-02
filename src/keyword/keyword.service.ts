import { Injectable } from '@nestjs/common';
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type KeywordModel = Prisma.KeywordDelegate<RejectOptions>;
const { defaultOptions, getCrud } = new CrudOptions<KeywordModel>().setOptions(
  {},
);

@Injectable()
export class KeywordService extends getCrud<
  Prisma.KeywordGetPayload<typeof defaultOptions>
>() {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma.keyword, defaultOptions);
  }
}
