import { PickType } from '@nestjs/mapped-types';
import { CommunityEntity } from '../entities/community.entity';

export class CreateCommunityDto extends PickType(CommunityEntity, [
  'category',
]) {}
