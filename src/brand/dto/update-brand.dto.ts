import { PickType } from '@nestjs/mapped-types';
import { BrandEntity } from '../entities/brand.entity';

export class UpdateBrandDto extends PickType(BrandEntity, [
  'name',
  'parentId',
]) {}
