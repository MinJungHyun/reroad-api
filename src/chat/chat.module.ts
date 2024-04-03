import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ChatJoinService } from './chat-join.service';
import { ChatMessageService } from './chat-message.service';

@Module({
  imports: [PrismaModule],
  controllers: [ChatController],
  providers: [ChatService, ChatJoinService, ChatMessageService],
})
export class ChatModule {}
