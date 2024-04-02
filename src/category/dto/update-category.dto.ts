import { PickType } from '@nestjs/mapped-types';
import { CategoryEntity } from '../entities/category.entity';

export class UpdateCategoryDto extends PickType(CategoryEntity, [
  'name',
  'parentId',
]) {}
