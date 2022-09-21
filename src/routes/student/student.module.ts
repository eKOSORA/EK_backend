import {
  AcademicLevel,
  AcademicLevelSchema,
} from './../../schemas/academicLevel.schema';
import { Educator, EducatorSchema } from './../../schemas/educator.schema';
import { Subject, SubjectSchema } from './../../schemas/subject.schema';
import { EducatorService } from './../educator/educator.service';
import { ParentService } from './../parent/parent.service';
import { Parent, ParentSchema } from '../../schemas/parent.schema';
import { SendGridService } from './../sendgrid/sendgrid.service';
import { Student, StudentSchema } from './../../schemas/student.schema';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: Parent.name, schema: ParentSchema },
      { name: Educator.name, schema: EducatorSchema },
      { name: AcademicLevel.name, schema: AcademicLevelSchema },
      { name: Subject.name, schema: SubjectSchema },
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService, SendGridService, ParentService, EducatorService],
})
export class StudentModule {}
