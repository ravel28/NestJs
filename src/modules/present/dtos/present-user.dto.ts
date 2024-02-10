import { StatusPresentType } from '@prisma/client';

export class PresentUserDto {
  id: number;
  uniqueId: string;
  date: string;
  time: string;
  name: string;
  status: StatusPresentType;
}
