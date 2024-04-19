import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { KeywordService } from './keyword.service';
import { User } from 'src/user/user.decorator';

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

  // @Get()
  // findAll() {
  //   return this.keywordService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.keywordService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateKeywordDto: UpdateKeywordDto) {
  //   return this.keywordService.update(+id, updateKeywordDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.keywordService.remove(+id);
  // }
}
