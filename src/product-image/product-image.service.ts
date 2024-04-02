import { Injectable } from '@nestjs/common';
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type ProductImageModel = Prisma.ProductImageDelegate<RejectOptions>;
const { defaultOptions, getCrud } =
  new CrudOptions<ProductImageModel>().setOptions({});

@Injectable()
export class ProductImageService extends getCrud<
  Prisma.ProductImageGetPayload<typeof defaultOptions>
>() {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma.productImage, defaultOptions);
  }
}
