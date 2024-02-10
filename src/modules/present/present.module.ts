import { Module } from '@nestjs/common';
import { PresentService } from './present.service';
import { PresentController } from './present.controller';
import { PrismaService } from 'src/core/services/prisma.service';

@Module({
  controllers: [PresentController],
  providers: [PresentService, PrismaService],
})
export class PresentModule {}
