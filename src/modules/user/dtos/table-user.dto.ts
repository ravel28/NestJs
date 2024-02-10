import { GenderType } from '@prisma/client';

export class TableViewUserDataDto {
  id: number;
  uniqueId: string;
  email: string;
  name: string;
  password: string;
  gender: GenderType;
  presentStatus?: string;
  educationLevelId: number;
}
