import { PickType } from '@nestjs/mapped-types';
import { DislikeEntity } from '../entities/dislike.entity';

export class CreateDislikeDto extends PickType(DislikeEntity, ['postId']) {}
