import { PickType } from '@nestjs/mapped-types';
import { ImageEntity } from '../entities/image.entity';

export class CreateImageDto extends PickType(ImageEntity, ['postId', 'url']) {}
