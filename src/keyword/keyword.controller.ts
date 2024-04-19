import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { KeywordDTO } from './dto/keyword.dto';
import { KeywordService } from './keyword.service';

@Controller('keyword')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createKeywordDto: CreateKeywordDto, @User() user: any) {
    return this.keywordService.create({
      word: createKeywordDto.word,
      userId: user.id
    });
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  findAllKeyword(@User() user: any): Promise<KeywordDTO[]> {
    return this.keywordService.findAll(user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id', ParseIntPipe) id: number, @User() user: any) {
    return this.keywordService.delete(id, user.id);
  }
}
