import { Injectable } from '@nestjs/common';
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type ChatJoinModel = Prisma.ChatJoinDelegate<RejectOptions>;
const { defaultOptions, getCrud } = new CrudOptions<ChatJoinModel>().setOptions(
  {},
);

@Injectable()
export class ChatJoinService extends getCrud<
  Prisma.ChatJoinGetPayload<typeof defaultOptions>
>() {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma.chatJoin, defaultOptions);
  }
}
