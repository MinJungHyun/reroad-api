import { ChatMessage, MessageType } from '@prisma/client';

export class ChatMessageEntity implements ChatMessage {
  id: number;
  chatId: number;
  userId: number;
  message: string;
  type: MessageType;
  createdAt: Date;
}
