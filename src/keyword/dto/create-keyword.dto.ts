import { PickType } from '@nestjs/mapped-types';
import { KeywordEntity } from '../entities/keyword.entity';

export class CreateKeywordDto extends PickType(KeywordEntity, [
  'word',
  'userId',
]) {}
