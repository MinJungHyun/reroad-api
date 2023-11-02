import { PickType } from '@nestjs/mapped-types';
import { LikeEntity } from '../entities/like.entity';

export class UpdateLikeDto extends PickType(LikeEntity, ['postId']) {}
