import { PickType } from '@nestjs/mapped-types';
import { PostEntity } from '../entities/post.entity';

export class UpdatePostDto extends PickType(PostEntity, [
  'title',
  'content',
  'communityId',
]) {}
