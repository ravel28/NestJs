import { Response } from 'express';
import { UserDto } from '../dtos/user.dto';
import { SearchDto } from 'src/core/dtos/search.dto';

export default interface UserControllerInterface {
  createUser(res: Response, dto: UserDto): Promise<Response>;
  getUser(res: Response, dto: SearchDto): Promise<Response>;
  updateUser(res: Response, uniqueId: string, dto: UserDto): Promise<Response>;
  deleteUser(res: Response, uniqueId: string): Promise<Response>;
}
