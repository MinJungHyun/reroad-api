import { Module } from '@nestjs/common';
import { ChatJoinService } from './chat-join.service';
import { ChatJoinController } from './chat-join.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ChatJoinController],
  providers: [ChatJoinService],
})
export class ChatJoinModule {}
