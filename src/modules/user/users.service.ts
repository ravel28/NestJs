import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import BaseService from 'src/core/services/base.service';
import UserServiceInterface from './interfaces/user.service.interface';
import { SearchDto } from 'src/core/dtos/search.dto';
import { UserDto } from './dtos/user.dto';
import { PrismaService } from 'src/core/services/prisma.service';
import { MetaDto } from 'src/core/dtos/meta.dto';
import { StatusPresentType } from '@prisma/client';
import { catchError, concatMap, from, lastValueFrom } from 'rxjs';
import { TableViewUserDataDto } from './dtos/table-user.dto';
import { PaginationUserDto } from './dtos/pagination-user.dto';
import { startOfDay, endOfDay } from 'date-fns';

@Injectable()
export class UserService extends BaseService implements UserServiceInterface {
  constructor(private readonly prisma: PrismaService) {
    super(UserService.name);
  }

  async createUser(dto: UserDto): Promise<UserDto> {
    try {
      const checkingEmail = await this.prisma.users.findFirst({
        where: {
          email: dto.email,
        },
      });
      if (checkingEmail !== null)
        throw new BadRequestException('Email already exit');
      return await this.prisma.users.create({
        data: dto,
      });
    } catch (error) {
      this.handleErrorService(error);
    }
  }

  async mappingPresentUser(user: TableViewUserDataDto) {
    try {
      const todayStart = startOfDay(new Date());
      const todayEnd = endOfDay(new Date());
      const present = await this.prisma.presents.findFirst({
        where: {
          AND: [
            {
              date: {
                gte: todayStart,
                lte: todayEnd,
              },
            },
            {
              usersId: user.id,
            },
          ],
        },
      });
      present !== null
        ? (user.presentStatus = present.status)
        : (user.presentStatus = 'Not present');
      return user;
    } catch (error) {
      this.handleErrorService(error);
    }
  }

  async getUser(dto: SearchDto): Promise<PaginationUserDto> {
    try {
      // Main data
      const items: TableViewUserDataDto[] = await this.prisma.users.findMany({
        take: dto.take,
        skip: dto.take * (dto.page - 1),
        orderBy: {
          name: 'desc',
        },
      });

      if (items.length < 1)
        throw new NotFoundException('We apologize, user data is null ');

      const mappingItems = from(items).pipe(
        catchError((error) => {
          throw new NotFoundException(error?.response);
        }),
        concatMap((user) => this.mappingPresentUser(user)),
      );

      await lastValueFrom(mappingItems);

      // Meta data
      const keyword: string = dto.keyword ? dto.keyword : null;
      const totalItems: number = await this.prisma.users.count();
      const totalItemsPerPage: number = items.length;
      const currentPage: number = dto.page;
      const totalPage: number = Math.ceil(totalItems / dto.take);

      const meta: MetaDto = {
        keyword,
        totalItems,
        totalItemsPerPage,
        currentPage,
        totalPage,
      };

      //Dashboard data
      const late: number = await this.prisma.presents.count({
        where: {
          status: StatusPresentType.LATE,
        },
      });

      const onTime: number = await this.prisma.presents.count({
        where: {
          status: StatusPresentType.ONTIME,
        },
      });

      const sick: number = await this.prisma.presents.count({
        where: {
          status: StatusPresentType.SICK,
        },
      });

      const alfa: number = await this.prisma.presents.count({
        where: {
          status: StatusPresentType.ALFA,
        },
      });

      const dashboard = {
        late,
        onTime,
        sick,
        alfa,
      };

      const data: PaginationUserDto = {
        items,
        meta,
        dashboard,
      };

      return data;
    } catch (error) {
      this.handleErrorService(error);
    }
  }

  async updateUser(dto: UserDto): Promise<UserDto> {
    try {
      return await this.prisma.users.update({
        where: {
          uniqueId: dto.uniqueId,
        },
        data: dto,
      });
    } catch (error) {
      this.handleErrorService(error);
    }
  }

  async deleteUser(uniqueId: string): Promise<string> {
    try {
      await this.prisma.users.delete({
        where: { uniqueId },
      });
      return 'Data user has been deleted';
    } catch (error) {
      this.handleErrorService(error);
    }
  }
}
