import {
  AcademicYear,
  AcademicYearSchema,
} from './../../schemas/academicYear.schema';
import { SchoolTerm, SchoolTermSchema } from './../../schemas/term.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingsService } from './settings.service';
import { SettingsController } from './setttings.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SchoolTerm.name, schema: SchoolTermSchema },
      { name: AcademicYear.name, schema: AcademicYearSchema },
    ]),
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
