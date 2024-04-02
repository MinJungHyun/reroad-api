import { PickType } from '@nestjs/mapped-types';
import { ProductEntity } from '../entities/product.entity';

export class CreateProductDto extends PickType(ProductEntity, [
  'name',
  'description',
  'price',
  'hideAt',
  'deletedAt',
  'completedAt',
  'categoryId',
  'brandId',
  'createdById',
  'transactionType',
  'transactionState',
]) {}
