import { SearchDto } from 'src/core/dtos/search.dto';
import { PaginationUserDto } from '../dtos/pagination-user.dto';
import { UserDto } from '../dtos/user.dto';

export default interface UserServiceInterface {
  createUser(dto: UserDto): Promise<UserDto>;
  getUser(dto: SearchDto): Promise<PaginationUserDto>;
  updateUser(dto: UserDto): Promise<UserDto>;
  deleteUser(uniqueId: string): Promise<string>;
}
