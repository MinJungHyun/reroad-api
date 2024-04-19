import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { KeywordService } from './keyword.service';
import { User } from 'src/user/user.decorator';
import { KeywordDTO } from './dto/keyword.dto';

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

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllKeyword(@User() user: any): Promise<KeywordDTO[]> {
    return this.keywordService.findAll(user.id);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  delete(@Param('word') word: string, @User() user: any) {
    console.log(word, user.id);
    return this.keywordService.delete(word, user.id);
  }
}
