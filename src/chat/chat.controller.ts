import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ProductService } from 'src/product/product.service';
import { User } from 'src/user/user.decorator';
import { ChatJoinService } from './chat-join.service';
import { ChatMessageService } from './chat-message.service';
import { ChatService } from './chat.service';
import { IChatId } from './chat.type';
import { CreateChatMessageInput } from './dto/create-chat-message.input';
import { ChatListDTO } from './dto/chat-list.dto';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatJoinService: ChatJoinService,
    private readonly chatMessageService: ChatMessageService,
    private readonly productService: ProductService
  ) {}

  @Get('/list')
  @UseGuards(JwtAuthGuard)
  async getChats(@User() user: any): Promise<ChatListDTO[]> {
    return await this.chatService.getChatList(user.id);
  }

  @Get(':chatId')
  @UseGuards(JwtAuthGuard)
  async getMessages(@Param('chatId', ParseIntPipe) chatId: number, @User() user: any) {
    // 해당 userId와 chatId가 있는지 체크, 맞는지 체크
    const bool = await this.chatJoinService.checkChat(chatId, user.id);

    // 없으면 에러
    if (!bool) {
      throw new Error('Chat not found');
    }

    //  메세지 반환
    return await this.chatMessageService.findMessages(chatId);
  }

  @Get('/:chatId/info')
  @UseGuards(JwtAuthGuard)
  async getRoomInfo(@Param('chatId', ParseIntPipe) chatId: number, @User() user: any) {
    // 해당 userId와 chatId가 있는지 체크, 맞는지 체크
    const bool = await this.chatJoinService.checkChat(chatId, user.id);

    // 없으면 에러
    if (!bool) {
      throw new Error('Chat not found');
    }

    //  메세지 반환
    return await this.chatService.getInfo(chatId);
  }

  @Get('/p/:productId')
  @UseGuards(JwtAuthGuard)
  async getChatByProductId(@Param('productId', ParseIntPipe) productId: number, @User() user: any): Promise<IChatId> {
    // 1.있는지 체크
    let chatId: number = await this.chatJoinService.findChatByProduct(productId, user.id);

    // 2. 만든적없으면 생성
    if (chatId == 0) {
      const chat = await this.chatService.create({ productId });
      const product = await this.productService.findOne(productId);
      const ownerId = product?.createdById;
      await this.chatJoinService.create({ chatId: chat.id, userId: user.id });
      await this.chatJoinService.create({ chatId: chat.id, userId: ownerId });

      chatId = chat.id;
    }

    // 3. 메시지반환
    return {
      chatId
    };
  }
  @Post(':id')
  @UseGuards(JwtAuthGuard)
  async createMessage(@Param('id') id: string, @Body() createChatMessageDto: CreateChatMessageInput, @User() user: any) {
    const input: CreateChatMessageInput = {
      chatId: +id,
      message: createChatMessageDto.message,
      userId: user.id,
      type: createChatMessageDto.type
    };
    return await this.chatMessageService.create(input);
  }
}
