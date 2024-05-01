import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ChatListDTO } from './dto/chat-list.dto';

type ChatModel = Prisma.ChatDelegate<RejectOptions>;
const { defaultOptions, getCrud } = new CrudOptions<ChatModel>().setOptions({});

@Injectable()
export class ChatService extends getCrud<Prisma.ChatGetPayload<typeof defaultOptions>>() {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma.chat, defaultOptions);
  }

  async getInfo(id: number): Promise<any> {
    return await this.prisma.chat.findUnique({
      where: { id },
      include: {
        chatJoins: true,
        product: {
          include: {
            createdBy: true
          }
        }
      }
    });
  }

  async getChatList(userId: number): Promise<ChatListDTO[]> {
    const chatsInfo = await this.prisma.chat.findMany({
      where: {
        AND: [
          { chatJoins: { some: { userId } } },
          {
            chatMessages: { some: {} }
          }
        ]
      },
      include: {
        chatMessages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
          select: {
            message: true,
            type: true,
            createdAt: true
          }
        },
        product: {
          select: {
            name: true,
            images: {
              select: {
                url: true
              }
            },
            createdBy: {
              select: {
                name: true,
                image: true
              }
            }
          }
        }
      }
    });

    const chatLists: ChatListDTO[] = chatsInfo.map(chat => {
      return {
        chatId: chat.id,
        message: chat.chatMessages[0].message,
        messageAt: chat.chatMessages[0].createdAt,
        messageType: chat.chatMessages[0].type,
        userImage: chat.product.createdBy?.image || '',
        userName: chat.product.createdBy.name,
        productImage: chat.product.images?.[0]?.url || '',
        productName: chat.product.name
      };
    });

    return chatLists;
  }
}
