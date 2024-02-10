import { MetaDto } from 'src/core/dtos/meta.dto';
import { TableViewEducatiionLevelDto } from './table-education-level.dto';

export class PaginationEducationLevelDto {
  items: TableViewEducatiionLevelDto[];
  meta: MetaDto;
  dashboard: undefined;
}
