import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatJoinModule } from './chat-join/chat-join.module';
import { ChatMessageModule } from './chat-message/chat-message.module';
import { ChatModule } from './chat/chat.module';
import { KeywordModule } from './keyword/keyword.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductImageModule } from './product-image/product-image.module';
import { ProductLikeModule } from './product-like/product-like.module';
import { ProductModule } from './product/product.module';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';

const modules = [
  ChatModule,
  ChatJoinModule,
  ChatMessageModule,
  KeywordModule,
  TagModule,
  ProductModule,
  ProductLikeModule,
  ProductImageModule,
  ProductModule,
  ProductLikeModule,
];
@Module({
  imports: [PrismaModule, UserModule, AuthModule, ...modules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
