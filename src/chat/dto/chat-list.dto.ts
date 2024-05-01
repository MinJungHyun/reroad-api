import { MessageType } from '@prisma/client';

export class ChatListDTO {
  chatId: number;
  message: string;
  messageType: MessageType;
  messageAt: Date;
  userName: string;
  userImage: string;
  productImage: string;
  productName: string;
}
