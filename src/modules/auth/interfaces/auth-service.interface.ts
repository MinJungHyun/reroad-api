import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { IAuthUserItem } from 'src/common/types/context';

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUserItem;
}

export interface IAuthServiceSetRefreshToken {
  user: User;
  res: Response;
  req: Request;
}
