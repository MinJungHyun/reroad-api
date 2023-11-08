import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  exports: [UserService],
  controllers: [UserController],
  imports: [PrismaModule, AuthModule],
  providers: [UserService],
})
export class UserModule {}
