import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { KeywordModule } from './keyword/keyword.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { S3Service } from './aws/s3.service';

const modules = [ChatModule, KeywordModule, ProductModule, ProductModule];
@Module({
  imports: [PrismaModule, UserModule, AuthModule, ...modules],
  controllers: [AppController],
  providers: [AppService, S3Service],
})
export class AppModule {}
