import { Parent, ParentSchema } from './../../schemas/parent.schema';
import { Educator, EducatorSchema } from './../../schemas/educator.schema';
import { Student, StudentSchema } from './../../schemas/student.schema';
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
      { name: Student.name, schema: StudentSchema },
      { name: Educator.name, schema: EducatorSchema },
      { name: Parent.name, schema: ParentSchema },
    ]),
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
