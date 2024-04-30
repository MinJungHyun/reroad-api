import { Injectable } from '@nestjs/common';
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type ChatMessageModel = Prisma.ChatMessageDelegate<RejectOptions>;
const { defaultOptions, getCrud } = new CrudOptions<ChatMessageModel>().setOptions({});

@Injectable()
export class ChatMessageService extends getCrud<Prisma.ChatMessageGetPayload<typeof defaultOptions>>() {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma.chatMessage, defaultOptions);
  }

  async findMessages(chatId: number): Promise<Prisma.ChatMessageGetPayload<typeof defaultOptions>[]> {
    return this.prisma.chatMessage.findMany({
      where: {
        chatId
      },
      orderBy: { id: 'asc' }
    });
  }
}
