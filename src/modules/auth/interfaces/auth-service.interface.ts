import { Request, Response } from 'express';
import { IAuthUserItem } from 'src/commons/types/context';
import { User } from 'src/modules/users/entities/user.entity';

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUserItem;
}

export interface IAuthServiceSetRefreshToken {
  user: User;
  res: Response;
  req: Request;
}
