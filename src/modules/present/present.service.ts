import { BadRequestException, Injectable } from '@nestjs/common';
import BaseService from 'src/core/services/base.service';
import PresentServiceInterface from './interfaces/present.service.interface';
import { PresentUserDto } from './dtos/present-user.dto';
import { PrismaService } from 'src/core/services/prisma.service';
import { endOfDay, startOfDay } from 'date-fns';
import { StatusPresentType } from '@prisma/client';

@Injectable()
export class PresentService
  extends BaseService
  implements PresentServiceInterface
{
  constructor(private readonly prisma: PrismaService) {
    super(PresentService.name);
  }

  async presentUser(uniqueIdUser: string): Promise<PresentUserDto> {
    try {
      const findingUser = await this.prisma.users.findUnique({
        where: { uniqueId: uniqueIdUser },
      });

      const todayStart = startOfDay(new Date());
      const todayEnd = endOfDay(new Date());
      const checkingPresent = await this.prisma.presents.findFirst({
        where: {
          AND: [
            {
              date: {
                gte: todayStart,
                lte: todayEnd,
              },
            },
            {
              usersId: findingUser.id,
            },
          ],
        },
        include: {
          users: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      });

      this.logger.debug(checkingPresent);

      if (checkingPresent !== null)
        throw new BadRequestException(
          'User already present today, see you next time',
        );

      const timeStamp = new Date();
      const statusPresent: StatusPresentType =
        timeStamp.getHours() > 8
          ? StatusPresentType.LATE
          : StatusPresentType.ONTIME;

      const presentUser = await this.prisma.presents.create({
        data: {
          date: new Date(),
          usersId: findingUser.id,
          status: statusPresent,
        },
      });

      const formattedDate = new Date(presentUser.date);

      const day = formattedDate.getDate().toString().padStart(2, '0');
      const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
      const year = formattedDate.getFullYear();
      const hours = formattedDate.getHours().toString().padStart(2, '0');
      const minutes = formattedDate.getMinutes().toString().padStart(2, '0');
      const seconds = formattedDate.getSeconds().toString().padStart(2, '0');

      const data: PresentUserDto = {
        id: presentUser.id,
        uniqueId: presentUser.uniqueId,
        date: `${day}-${month}-${year}`,
        time: `${hours}:${minutes}:${seconds}`,
        name: findingUser.name,
        status: presentUser.status,
      };
      return data;
    } catch (error) {
      this.handleErrorService(error);
    }
  }
}
