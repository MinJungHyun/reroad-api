import { Injectable } from '@nestjs/common';
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type ImageModel = Prisma.ImageDelegate<RejectOptions>;
const { defaultOptions, getCrud } = new CrudOptions<ImageModel>().setOptions(
  {},
);

@Injectable()
export class ImageService extends getCrud<
  Prisma.ImageGetPayload<typeof defaultOptions>
>() {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma.image, defaultOptions);
  }
}
