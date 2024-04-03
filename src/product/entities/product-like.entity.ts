import { ProductLike } from '@prisma/client';

export class ProductLikeEntity implements ProductLike {
  id: number;
  userId: number;
  productId: number;
}
