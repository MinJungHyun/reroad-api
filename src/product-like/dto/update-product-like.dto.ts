import { PickType } from '@nestjs/mapped-types';
import { ProductLikeEntity } from '../entities/product-like.entity';

export class UpdateProductLikeDto extends PickType(ProductLikeEntity, [
  'productId',
]) {}
