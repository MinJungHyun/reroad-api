import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatJoinService } from './chat-join.service';
import { CreateChatJoinDto } from './dto/create-chat-join.dto';
import { UpdateChatJoinDto } from './dto/update-chat-join.dto';

@Controller('chat-join')
export class ChatJoinController {
  constructor(private readonly chatJoinService: ChatJoinService) {}

  @Post()
  create(@Body() createChatJoinDto: CreateChatJoinDto) {
    return this.chatJoinService.create(createChatJoinDto);
  }

  @Get()
  findAll() {
    return this.chatJoinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatJoinService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChatJoinDto: UpdateChatJoinDto,
  ) {
    return this.chatJoinService.update(+id, updateChatJoinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatJoinService.remove(+id);
  }
}
