import { MetaDto } from 'src/core/dtos/meta.dto';
import { UserDto } from './user.dto';
import { DashboardUserDto } from './dashboard-user.dto';

export class PaginationUserDto {
  items: UserDto[];
  meta: MetaDto;
  dashboard: DashboardUserDto;
}
