import { Dislike } from '@prisma/client';

export class DislikeEntity implements Dislike {
  id: number;
  postId: number;
}
