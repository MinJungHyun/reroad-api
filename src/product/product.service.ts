import { Injectable } from '@nestjs/common';
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type ProductModel = Prisma.ProductDelegate<RejectOptions>;
const { defaultOptions, getCrud } = new CrudOptions<ProductModel>().setOptions({});

@Injectable()
export class ProductService extends getCrud<Prisma.ProductGetPayload<typeof defaultOptions>>() {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma.product, defaultOptions);
  }

  async findCategory(category: number) {
    return this.prisma.product.findMany({
      where: {
        categoryId: category
      },
      include: {
        images: true,
        createdBy: true
      }
    });
  }
  async findCategoryByCursor(category: number, take?: number, cursorId?: number) {
    const whereCondition: Prisma.ProductWhereInput[] = [{ categoryId: category }];

    if (cursorId) {
      whereCondition.push({ id: { gt: cursorId } });
    }
    const products = await this.prisma.product.findMany({
      where: {
        AND: whereCondition
      },
      take,
      orderBy: { id: 'asc' } // 여기서 'asc' 또는 'desc'로 정렬 순서를 지정할 수 있습니다.
    });

    return products;
  }

  async getProduct(id: number) {
    return this.prisma.product.findUnique({
      where: {
        id
      },
      include: {
        images: true,
        createdBy: true,
        category: true
      }
    });
  }
}
