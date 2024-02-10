import { Response } from 'express';
import { HttpStatus, Logger } from '@nestjs/common';
import { ResponseDto } from '../dtos/response.dto';

abstract class BaseController {
  public logger: Logger;
  private instanceName: string;

  constructor(instance: string) {
    this.logger = new Logger(instance);
    this.instanceName = instance;
  }

  ok<T>(res: Response, data: T, meta?: object): Response;
  ok<T, U>(res: Response, data: T, meta: U): Response;
  ok(res: Response, data: any): Response {
    const item = data?.items === undefined ? data : data.items;
    const { dashboard } = data;
    const result = { item, dashboard };
    return res
      .status(HttpStatus.OK)
      .send(
        ResponseDto.toResponse(
          result,
          data.meta === undefined ? { status: 'OK' } : data.meta,
        ),
      );
  }

  created<T>(res: Response, data: T, meta?: object): Response;
  created<T, U>(res: Response, data: T, meta: U): Response;
  created<T>(res: Response, data: T, meta: any): Response {
    return res
      .status(HttpStatus.CREATED)
      .send(
        ResponseDto.toResponse(
          data,
          meta === undefined ? { status: 'OK' } : { status: 'OK' },
        ),
      );
  }

  responseNoContent(res: Response, data: any) {
    return res.status(HttpStatus.NO_CONTENT).send(data);
  }

  handleError(res: Response, error: any) {
    const response = error.response
      ? {
          message: error.response?.message,
          error: error.response?.error,
          statusCode: error.response?.statusCode,
          time: new Date(),
        }
      : {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
          time: new Date(),
        };
    return res.status(response.statusCode).json(response);
  }
}

export default BaseController;
