import { EducatorService } from './educator.service';
import { EducatorController } from './educator.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [EducatorController],
  providers: [EducatorService],
})
export class EducatorModule {}
