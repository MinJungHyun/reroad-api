import { Module } from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageController } from './chat-message.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ChatMessageController],
  providers: [ChatMessageService],
})
export class ChatMessageModule {}
