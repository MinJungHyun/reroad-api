import { Injectable } from '@nestjs/common';
import { CrudOptions, RejectOptions } from '@cjr-unb/super-crud';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type MessageModel = Prisma.MessageDelegate<RejectOptions>;
const { defaultOptions, getCrud } = new CrudOptions<MessageModel>().setOptions(
  {},
);

@Injectable()
export class MessageService extends getCrud<
  Prisma.MessageGetPayload<typeof defaultOptions>
>() {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma.message, defaultOptions);
  }
}
