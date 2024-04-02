import { Injectable } from '@nestjs/common';
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type CategoryModel = Prisma.CategoryDelegate<RejectOptions>;
const { defaultOptions, getCrud } = new CrudOptions<CategoryModel>().setOptions(
  {},
);

@Injectable()
export class CategoryService extends getCrud<
  Prisma.CategoryGetPayload<typeof defaultOptions>
>() {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma.category, defaultOptions);
  }
}
