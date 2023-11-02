import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ChatModule } from './chat/chat.module';
import { DislikeModule } from './dislike/dislike.module';
import { CommunityModule } from './community/community.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { MessageModule } from './message/message.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ProductLikeModule } from './product-like/product-like.module';

const modules = [
  ChatModule,
  DislikeModule,
  CommunityModule,
  CommentModule,
  LikeModule,
  MessageModule,
  PostModule,
  UserModule,
  ProductModule,
  ProductLikeModule,
];
@Module({
  imports: [PrismaModule, ...modules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
