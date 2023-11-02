import { Module } from '@nestjs/common';
import { DislikeService } from './dislike.service';
import { DislikeController } from './dislike.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DislikeController],
  providers: [DislikeService],
})
export class DislikeModule {}
