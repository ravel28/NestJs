import { GenderType } from '@prisma/client';

export class UsersDto {
  id: number;
  uniqueId: string;
  email: string;
  name: string;
  password: string;
  gender: GenderType;
  educationId: number;
}
