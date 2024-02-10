import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import BaseService from 'src/core/services/base.service';
import EducatiionLevelServiceInterface from './interfaces/eduaction-level.service.interface';
import { EducatiionLevelDto } from './dtos/education-level.dto';
import { PaginationEducationLevelDto } from './dtos/pagination-education-level.dto';
import { PrismaService } from 'src/core/services/prisma.service';
import { SearchDto } from 'src/core/dtos/search.dto';
import { MetaDto } from 'src/core/dtos/meta.dto';
import { Prisma } from '@prisma/client';
import { UserDto } from '../user/dtos/user.dto';
import { TableViewEducatiionLevelDto } from './dtos/table-education-level.dto';
import { catchError, concatMap, from, lastValueFrom } from 'rxjs';

@Injectable()
export class EducationLevelService
  extends BaseService
  implements EducatiionLevelServiceInterface
{
  constructor(private readonly prisma: PrismaService) {
    super(EducationLevelService.name);
  }

  async createNewLevel(dto: EducatiionLevelDto): Promise<EducatiionLevelDto> {
    try {
      return await this.prisma.educationLevels.create({
        data: dto,
      });
    } catch (error) {
      this.handleErrorService(error);
    }
  }

  async checkingUser(item: TableViewEducatiionLevelDto) {
    try {
      const checkingUser = await this.prisma.users.count({
        where: {
          educationLevelId: item.id,
        },
      });
      checkingUser !== null ? (item.users = checkingUser) : 0;
      return item;
    } catch (error) {
      this.handleErrorService(error);
    }
  }

  async getEducationLevel(
    dto: SearchDto,
  ): Promise<PaginationEducationLevelDto> {
    try {
      //Main data
      const items: TableViewEducatiionLevelDto[] =
        await this.prisma.educationLevels.findMany({
          take: dto.take,
          skip: dto.take * (dto.page - 1),
          orderBy: {
            level: 'asc',
          },
        });

      if (items.length < 1)
        throw new NotFoundException(
          'We apologize Level data of education is null ',
        );

      const mappingItems = from(items).pipe(
        catchError((error) => {
          throw new NotFoundException(error?.response);
        }),
        concatMap((user) => this.checkingUser(user)),
      );

      await lastValueFrom(mappingItems);

      //Meta data
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

      //Dashboard data (have not a statistic for this)
      const dashboard: undefined = undefined;

      const data: PaginationEducationLevelDto = {
        items,
        meta,
        dashboard,
      };
      return data;
    } catch (error) {
      this.handleErrorService(error);
    }
  }

  async updateEducationLevel(
    dto: EducatiionLevelDto,
  ): Promise<EducatiionLevelDto> {
    try {
      return await this.prisma.educationLevels.update({
        where: {
          uniqueId: dto.uniqueId,
        },
        data: dto,
      });
    } catch (error) {
      this.handleErrorService(error);
    }
  }

  async deleteLevel(uniqueId: string): Promise<string> {
    try {
      await this.prisma.$transaction(
        async () => {
          const findingLevelToUser: EducatiionLevelDto =
            await this.prisma.educationLevels.findUnique({
              where: { uniqueId },
            });
          const checkingUser: UserDto[] = await this.prisma.users.findMany({
            where: {
              educationLevelId: findingLevelToUser?.id,
            },
          });
          if (checkingUser.length < 1)
            await this.prisma.educationLevels.delete({ where: { uniqueId } });
          if (checkingUser.length > 0)
            throw new BadRequestException(
              'We apologize, data already been used',
            );
        },
        {
          maxWait: 1000,
          timeout: 2000,
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        },
      );
      return 'Data has been Deleted';
    } catch (error) {
      this.handleErrorService(error);
    }
  }
}
