import { PickType } from '@nestjs/mapped-types';
import { BrandEntity } from '../entities/brand.entity';

export class CreateBrandDto extends PickType(BrandEntity, [
  'name',
  'parentId',
]) {}
