import { ChatJoin } from '@prisma/client';

export class ChatJoinEntity implements ChatJoin {
  id: number;
  chatId: number;
  userId: number;
}
