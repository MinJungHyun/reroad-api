import { PickType } from '@nestjs/mapped-types';
import { KeywordEntity } from '../entities/keyword.entity';

export class UpdateKeywordDto extends PickType(KeywordEntity, [
  'name',
  'userId',
]) {}
