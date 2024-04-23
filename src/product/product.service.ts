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
}
