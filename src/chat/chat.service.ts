import { Injectable } from '@nestjs/common';
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Socket } from 'socket.io';

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
  sendMessage(client: Socket, message: string): void {
    client.emit('chatMessage', message);
  }
}
