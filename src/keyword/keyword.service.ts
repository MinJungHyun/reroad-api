import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { KeywordDTO } from './dto/keyword.dto';

@Injectable()
export class KeywordService {
  constructor(protected readonly prisma: PrismaService) {}

  async create(data: CreateKeywordDto) {
    return this.prisma.keyword.create({ data });
  }

  async findAll(userId: number): Promise<KeywordDTO[]> {
    const res = await this.prisma.keyword.findMany({
      where: { userId },
      orderBy: { id: 'desc' }
    });
    return res.map(r => ({ id: r.id, word: r.word }));
  }

  async delete(id: number, userId: number) {
    return await this.prisma.keyword.deleteMany({
      where: {
        id: id,
        userId: userId
      }
    });
  }
}
