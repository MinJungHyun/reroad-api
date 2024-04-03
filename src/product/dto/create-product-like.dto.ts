import { PickType } from '@nestjs/mapped-types';
import { ProductLikeEntity } from '../entities/product-like.entity';

export class CreateProductLikeDto extends PickType(ProductLikeEntity, [
  'userId',
  'productId',
]) {}
