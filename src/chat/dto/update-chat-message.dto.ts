import { PickType } from '@nestjs/mapped-types';
import { ChatMessageEntity } from '../entities/chat-message.entity';

export class UpdateChatMessageDto extends PickType(ChatMessageEntity, [
  'chatId',
  'userId',
  'message',
]) {}
