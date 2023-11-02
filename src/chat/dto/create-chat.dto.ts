import { PickType } from '@nestjs/mapped-types';
import { ChatEntity } from '../entities/chat.entity';

export class CreateChatDto extends PickType(ChatEntity, []) {}
