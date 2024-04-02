import { PickType } from '@nestjs/mapped-types';
import { ChatEntity } from '../entities/chat.entity';

export class UpdateChatDto extends PickType(ChatEntity, ['productId']) {}
