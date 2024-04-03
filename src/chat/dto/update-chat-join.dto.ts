import { PickType } from '@nestjs/mapped-types';
import { ChatJoinEntity } from '../entities/chat-join.entity';

export class UpdateChatJoinDto extends PickType(ChatJoinEntity, [
  'chatId',
  'userId',
]) {}
