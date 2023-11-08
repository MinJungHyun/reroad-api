import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  password: string;
  type: string;
  description: string;
  uid: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
