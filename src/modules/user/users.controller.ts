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
import { UserService } from './users.service';
import BaseController from 'src/core/controllers/base.controller';
import UserControllerInterface from './interfaces/user.controller.interface';
import { Response } from 'express';
import { SearchDto } from 'src/core/dtos/search.dto';
import { UserDto } from './dtos/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiTagsController } from 'src/core/enums/swagger.enum';
import { PaginationUserDto } from './dtos/pagination-user.dto';

@ApiTags(ApiTagsController.USER)
@Controller({
  version: '1',
  path: 'user',
})
export class UserController
  extends BaseController
  implements UserControllerInterface
{
  constructor(private readonly userService: UserService) {
    super(UserController.name);
  }

  @Post()
  async createUser(
    @Res() res: Response,
    @Body() dto: UserDto,
  ): Promise<Response> {
    try {
      const data: UserDto = await this.userService.createUser(dto);
      return this.created(res, data);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  @Get()
  async getUser(
    @Res() res: Response,
    @Query() dto: SearchDto,
  ): Promise<Response> {
    try {
      const data: PaginationUserDto = await this.userService.getUser(dto);
      return this.ok(res, data, data.meta);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  @Put('update/:uniqueId')
  async updateUser(
    @Res() res: Response,
    @Param('uniqueId') uniqueId: string,
    @Query() dto: UserDto,
  ): Promise<Response> {
    try {
      const query: UserDto = { ...dto, uniqueId };
      const data: UserDto = await this.userService.updateUser(query);
      return this.ok(res, data);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  @Delete()
  async deleteUser(
    @Res() res: Response,
    @Param() uniqueId: string,
  ): Promise<Response> {
    try {
      const data: string = await this.userService.deleteUser(uniqueId);
      return this.responseNoContent(res, data);
    } catch (error) {
      return this.handleError(res, error);
    }
  }
}
