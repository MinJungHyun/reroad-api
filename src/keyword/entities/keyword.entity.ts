import { Keyword } from '@prisma/client';

export class KeywordEntity implements Keyword {
  id: number;
  name: string;
  userId: number;
}
