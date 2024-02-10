import { Logger } from '@nestjs/common';
import {
  GenderType,
  Prisma,
  PrismaClient,
  StatusPresentType,
} from '@prisma/client';

export class InsertAllSeed {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never>;

  logger: Logger;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.logger = new Logger(InsertAllSeed.name);
  }

  async handleSeeds(): Promise<void> {
    await this.prisma.educationLevels.createMany({
      data: [
        {
          level: 'TK/Paud',
        },
        {
          level: 'SD (Sekolah Dasar)',
        },
        {
          level: 'SMP (Sekolah Menegah Kebawah)',
        },
        {
          level:
            'SMA (Sekolah Menengah Atas) / SMK (Sekolah Menegah Kejujuran)',
        },
        {
          level: 'Diploma',
        },
        {
          level: 'Sarjana',
        },
      ],
    });

    await this.prisma.users.createMany({
      data: [
        {
          email: 'ravelinno9@gmail.com',
          name: 'Muhammad Reza Ravelinno',
          gender: GenderType.PRIA,
          password: '1sampai100coba',
          educationLevelId: 5,
        },
        {
          email: 'fifah09@gmail.com',
          name: 'Afifah',
          gender: GenderType.WANITA,
          password: 'akusudahlelahdisini',
          educationLevelId: 6,
        },
      ],
    });

    await this.prisma.presents.createMany({
      data: [
        {
          date: new Date(),
          status: StatusPresentType.LATE,
          usersId: 1,
        },
        {
          date: new Date(),
          status: StatusPresentType.LATE,
          usersId: 2,
        },
      ],
    });

    this.logger.log('Creating all seed...');
  }
}
