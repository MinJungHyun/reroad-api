import { PickType } from '@nestjs/mapped-types';
import { ProductImageEntity } from '../entities/product-image.entity';

export class CreateProductImageDto extends PickType(ProductImageEntity, [
  'url',
  'productId',
]) {}
