import { PickType } from '@nestjs/mapped-types';
import { TagEntity } from '../entities/tag.entity';

export class UpdateTagDto extends PickType(TagEntity, ['name', 'productId']) {}
