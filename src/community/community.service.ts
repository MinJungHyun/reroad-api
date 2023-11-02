import { Injectable } from '@nestjs/common';
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type CommunityModel = Prisma.CommunityDelegate<RejectOptions>;
const { defaultOptions, getCrud } =
  new CrudOptions<CommunityModel>().setOptions({});

@Injectable()
export class CommunityService extends getCrud<
  Prisma.CommunityGetPayload<typeof defaultOptions>
>() {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma.community, defaultOptions);
  }
}
