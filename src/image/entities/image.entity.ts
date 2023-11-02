import { Image } from '@prisma/client';

export class ImageEntity implements Image {
  id: number;
  postId: number;
  url: string;
}
