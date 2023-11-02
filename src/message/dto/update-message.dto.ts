import { PickType } from '@nestjs/mapped-types';
import { MessageEntity } from '../entities/message.entity';

export class UpdateMessageDto extends PickType(MessageEntity, [
  'text',
  'chatId',
  'senderId',
  'receiverId',
]) {}
