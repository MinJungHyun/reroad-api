import { Injectable } from '@nestjs/common';
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type BrandModel = Prisma.BrandDelegate<RejectOptions>;
const { defaultOptions, getCrud } = new CrudOptions<BrandModel>().setOptions(
  {},
);

@Injectable()
export class BrandService extends getCrud<
  Prisma.BrandGetPayload<typeof defaultOptions>
>() {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma.brand, defaultOptions);
  }
}
