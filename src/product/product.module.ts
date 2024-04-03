import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TagService } from './tag.service';
import { ProductLikeService } from './product-like.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService, TagService, ProductLikeService],
})
export class ProductModule {}
