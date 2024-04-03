import { Injectable } from '@nestjs/common';
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type ProductLikeModel = Prisma.ProductLikeDelegate<RejectOptions>;
const { defaultOptions, getCrud } =
  new CrudOptions<ProductLikeModel>().setOptions({});

@Injectable()
export class ProductLikeService extends getCrud<
  Prisma.ProductLikeGetPayload<typeof defaultOptions>
>() {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma.productLike, defaultOptions);
  }
}
