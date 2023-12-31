import { Product } from '@prisma/client';

export class ProductEntity implements Product {
  id: number;
  name: string;
  description: string;
  category: string;
  marketplaceId: number;
}
