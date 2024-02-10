import { Response } from 'express';
import { EducatiionLevelDto } from '../dtos/education-level.dto';
import { SearchDto } from 'src/core/dtos/search.dto';

export default interface EducationLevelControllerInterface {
  createNewLevel(res: Response, dto: EducatiionLevelDto): Promise<Response>;
  getEducationLevel(res: Response, dto: SearchDto): Promise<Response>;
  updateEducationLevel(
    res: Response,
    uniqueId: string,
    dto: EducatiionLevelDto,
  ): Promise<Response>;
  deleteLevel(res: Response, uniqueId: string): Promise<Response>;
}
