import { Controller, Param, Post, Res } from '@nestjs/common';
import { PresentService } from './present.service';
import PresentControllerInterface from './interfaces/present.controller.interface';
import { Response } from 'express';
import BaseController from 'src/core/controllers/base.controller';
import { ApiTags } from '@nestjs/swagger';
import { ApiTagsController } from 'src/core/enums/swagger.enum';

@ApiTags(ApiTagsController.PRESENT)
@Controller({
  version: '1',
  path: 'present',
})
export class PresentController
  extends BaseController
  implements PresentControllerInterface
{
  constructor(private readonly presentService: PresentService) {
    super(PresentController.name);
  }

  @Post(':uniqueIdUser')
  async presentUser(
    @Res() res: Response,
    @Param('uniqueIdUser') uniqueIdUser: string,
  ): Promise<Response> {
    try {
      const data = await this.presentService.presentUser(uniqueIdUser);
      return this.ok(res, data);
    } catch (error) {
      return this.handleError(res, error);
    }
  }
}
