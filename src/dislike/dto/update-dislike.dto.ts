import { PickType } from '@nestjs/mapped-types';
import { DislikeEntity } from '../entities/dislike.entity';

export class UpdateDislikeDto extends PickType(DislikeEntity, ['postId']) {}
