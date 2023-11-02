import { PickType } from '@nestjs/mapped-types';
import { MessageEntity } from '../entities/message.entity';

export class CreateMessageDto extends PickType(MessageEntity, [
  'text',
  'chatId',
  'senderId',
  'receiverId',
]) {}
