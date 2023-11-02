import { Injectable } from '@nestjs/common';
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type MarketplaceModel = Prisma.MarketplaceDelegate<RejectOptions>;
const { defaultOptions, getCrud } =
  new CrudOptions<MarketplaceModel>().setOptions({});

@Injectable()
export class MarketplaceService extends getCrud<
  Prisma.MarketplaceGetPayload<typeof defaultOptions>
>() {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma.marketplace, defaultOptions);
  }
}
