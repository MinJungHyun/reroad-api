import { Comment } from '@prisma/client';

export class CommentEntity implements Comment {
  id: number;
  text: string;
  postId: number;
}
