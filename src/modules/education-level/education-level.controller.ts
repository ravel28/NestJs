import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { EducationLevelService } from './education-level.service';
import BaseController from 'src/core/controllers/base.controller';
import EducationLevelControllerInterface from './interfaces/education-level.controller.interface';
import { Response } from 'express';
import { SearchDto } from 'src/core/dtos/search.dto';
import { EducatiionLevelDto } from './dtos/education-level.dto';
import { PaginationEducationLevelDto } from './dtos/pagination-education-level.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiTagsController } from 'src/core/enums/swagger.enum';

@ApiTags(ApiTagsController.EDUCATION_LEVEL)
@Controller({
  version: '1',
  path: 'education-level',
})
export class EducationLevelController
  extends BaseController
  implements EducationLevelControllerInterface
{
  constructor(private readonly educationLevelService: EducationLevelService) {
    super(EducationLevelController.name);
  }

  @Post()
  async createNewLevel(
    @Res() res: Response,
    @Body() dto: EducatiionLevelDto,
  ): Promise<Response> {
    try {
      const data: EducatiionLevelDto =
        await this.educationLevelService.createNewLevel(dto);
      return this.created(res, data);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  @Get()
  async getEducationLevel(
    @Res() res: Response,
    @Query() dto: SearchDto,
  ): Promise<Response> {
    try {
      const data: PaginationEducationLevelDto =
        await this.educationLevelService.getEducationLevel(dto);
      return this.ok(res, data, data.meta);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  @Put('update/:uniqueId')
  async updateEducationLevel(
    @Res() res: Response,
    @Param('uniqueId') uniqueId: string,
    @Body() dto: EducatiionLevelDto,
  ): Promise<Response> {
    try {
      const query: EducatiionLevelDto = { ...dto, uniqueId };
      const data: EducatiionLevelDto =
        await this.educationLevelService.updateEducationLevel(query);
      return this.ok(res, data);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  @Delete('delete/:uniqueId')
  async deleteLevel(
    @Res() res: Response,
    @Param('uniqueId') uniqueId: string,
  ): Promise<Response> {
    try {
      const data: string =
        await this.educationLevelService.deleteLevel(uniqueId);
      return this.responseNoContent(res, data);
    } catch (error) {
      return this.handleError(res, error);
    }
  }
}
