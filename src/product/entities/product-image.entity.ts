import { ProductImage } from '@prisma/client';

export class ProductImageEntity implements ProductImage {
  id: number;
  url: string;
  productId: number;
}
