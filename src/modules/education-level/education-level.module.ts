import { Module } from '@nestjs/common';
import { EducationLevelService } from './education-level.service';
import { EducationLevelController } from './education-level.controller';
import { PrismaService } from 'src/core/services/prisma.service';

@Module({
  controllers: [EducationLevelController],
  providers: [EducationLevelService, PrismaService],
})
export class EducationLevelModule {}
