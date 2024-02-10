import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/users.module';
import { EducationLevelModule } from './modules/education-level/education-level.module';
import { PresentModule } from './modules/present/present.module';

@Module({
  imports: [UserModule, EducationLevelModule, PresentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
