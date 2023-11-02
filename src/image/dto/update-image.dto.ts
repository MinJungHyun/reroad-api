import { PickType } from '@nestjs/mapped-types';
import { ImageEntity } from '../entities/image.entity';

export class UpdateImageDto extends PickType(ImageEntity, ['postId', 'url']) {}
