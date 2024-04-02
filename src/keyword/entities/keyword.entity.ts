import { Keyword } from '@prisma/client';

export class KeywordEntity implements Keyword {
  id: number;
  word: string;
  userId: number;
}
