import { SearchDto } from 'src/core/dtos/search.dto';
import { EducatiionLevelDto } from '../dtos/education-level.dto';
import { PaginationEducationLevelDto } from '../dtos/pagination-education-level.dto';

export default interface EducatiionLevelServiceInterface {
  createNewLevel(dto: EducatiionLevelDto): Promise<EducatiionLevelDto>;
  getEducationLevel(dto: SearchDto): Promise<PaginationEducationLevelDto>;
  updateEducationLevel(dto: EducatiionLevelDto): Promise<EducatiionLevelDto>;
  deleteLevel(uniqueId: string): Promise<string>;
}
