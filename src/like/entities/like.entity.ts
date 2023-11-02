import { Like } from '@prisma/client';

export class LikeEntity implements Like {
  id: number;
  postId: number;
}
