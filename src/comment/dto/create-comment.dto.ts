import { PickType } from '@nestjs/mapped-types';
import { CommentEntity } from '../entities/comment.entity';

export class CreateCommentDto extends PickType(CommentEntity, [
  'text',
  'postId',
]) {}
