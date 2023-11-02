import { Injectable } from '@nestjs/common';
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type ChatModel = Prisma.ChatDelegate<RejectOptions>;
const { defaultOptions, getCrud } = new CrudOptions<ChatModel>().setOptions({});

@Injectable()
export class ChatService extends getCrud<
  Prisma.ChatGetPayload<typeof defaultOptions>
>() {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma.chat, defaultOptions);
  }
}
