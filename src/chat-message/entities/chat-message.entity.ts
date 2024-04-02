import { ChatMessage } from '@prisma/client';

export class ChatMessageEntity implements ChatMessage {
  id: number;
  chatId: number;
  userId: number;
  message: string;
  createdAt: Date;
}
