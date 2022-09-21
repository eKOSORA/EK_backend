import { Module } from '@nestjs/common';
import { EducatorController } from './educator.controller';
import { EducatorService } from './educator.service';

@Module({
  imports: [],
  controllers: [EducatorController],
  providers: [EducatorService],
})
export class EducatorModule {}
