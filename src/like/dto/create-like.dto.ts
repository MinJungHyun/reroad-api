import { PickType } from '@nestjs/mapped-types';
import { LikeEntity } from '../entities/like.entity';

export class CreateLikeDto extends PickType(LikeEntity, ['postId']) {}
