import { PickType } from '@nestjs/mapped-types';
import { CommunityEntity } from '../entities/community.entity';

export class UpdateCommunityDto extends PickType(CommunityEntity, [
  'category',
]) {}
