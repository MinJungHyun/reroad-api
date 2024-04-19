import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';

@Injectable()
export class KeywordService {
  constructor(protected readonly prisma: PrismaService) {}

  async create(data: CreateKeywordDto) {
    return this.prisma.keyword.create({ data });
  }
}
