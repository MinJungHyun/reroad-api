import { Injectable } from '@nestjs/common';
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type ChatJoinModel = Prisma.ChatJoinDelegate<RejectOptions>;
const { defaultOptions, getCrud } = new CrudOptions<ChatJoinModel>().setOptions({});

@Injectable()
export class ChatJoinService extends getCrud<Prisma.ChatJoinGetPayload<typeof defaultOptions>>() {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma.chatJoin, defaultOptions);
  }

  async findChatByProduct(productId: number, userId: number): Promise<number> {
    const res = await this.prisma.chatJoin.findMany({
      where: {
        AND: [
          {
            userId: userId
          },
          {
            chat: {
              productId
            }
          }
        ]
      },
      include: {
        chat: true
      },
      orderBy: { id: 'desc' }
    });

    const findChatId = res?.[0]?.chatId || 0;
    return findChatId;
  }

  async checkChat(chatId: number, userId: number): Promise<boolean> {
    const res = await this.prisma.chatJoin.findFirst({
      where: {
        AND: [
          {
            userId: userId
          },
          {
            chatId: chatId
          }
        ]
      }
    });

    return res != null;
  }
}
