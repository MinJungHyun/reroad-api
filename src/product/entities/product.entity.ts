import { Product } from '@prisma/client';
import { TransactionState, TransactionType } from '../product.enum';

export class ProductEntity implements Product {
  id: number;
  name: string;
  description: string;
  price: number;
  viewCount: number;
  chatCount: number;
  likeCount: number;
  isHidden: boolean;
  hideAt: Date;
  deletedAt: Date;
  completedAt: Date;
  categoryId: number;
  brandId: number;
  createdById: number;
  transactionType: TransactionType;
  transactionState: TransactionState;
}
