import { PickType } from '@nestjs/mapped-types';
import { CommentEntity } from '../entities/comment.entity';

export class UpdateCommentDto extends PickType(CommentEntity, [
  'text',
  'postId',
]) {}
