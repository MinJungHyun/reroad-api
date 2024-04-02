import { Module } from '@nestjs/common';
import { ProductLikeService } from './product-like.service';
import { ProductLikeController } from './product-like.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductLikeController],
  providers: [ProductLikeService],
})
export class ProductLikeModule {}
