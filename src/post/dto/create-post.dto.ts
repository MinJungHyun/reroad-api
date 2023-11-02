import { PickType } from '@nestjs/mapped-types';
import { PostEntity } from '../entities/post.entity';

export class CreatePostDto extends PickType(PostEntity, [
  'title',
  'content',
  'communityId',
]) {}
