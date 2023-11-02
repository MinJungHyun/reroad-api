import { ProductLike } from '@prisma/client';

export class ProductLikeEntity implements ProductLike {
  id: number;
  productId: number;
}
