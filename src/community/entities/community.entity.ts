import { Community } from '@prisma/client';

export class CommunityEntity implements Community {
  id: number;
  category: string;
}
