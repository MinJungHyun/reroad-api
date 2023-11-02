import { Message } from '@prisma/client';

export class MessageEntity implements Message {
  id: number;
  text: string;
  chatId: number;
  senderId: number;
  receiverId: number;
}
