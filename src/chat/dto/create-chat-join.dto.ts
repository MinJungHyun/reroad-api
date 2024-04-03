import { PickType } from '@nestjs/mapped-types';
import { ChatJoinEntity } from '../entities/chat-join.entity';

export class CreateChatJoinDto extends PickType(ChatJoinEntity, [
  'chatId',
  'userId',
]) {}
