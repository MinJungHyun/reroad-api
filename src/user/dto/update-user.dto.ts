import { PickType } from '@nestjs/mapped-types';
import { UserEntity } from '../entities/user.entity';

export class UpdateUserDto extends PickType(UserEntity, [
  'username',
  'email',
  'password',
]) {}
