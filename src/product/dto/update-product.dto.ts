import { PickType } from '@nestjs/mapped-types';
import { ProductEntity } from '../entities/product.entity';

export class UpdateProductDto extends PickType(ProductEntity, [
  'name',
  'description',
  'price',
  'hideAt',
  'deletedAt',
  'completedAt',
  'categoryId',
  'brandId',
  'createdById',
]) {}
