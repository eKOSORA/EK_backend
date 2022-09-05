import { SchoolTerm, SchoolTermSchema } from './../../schemas/term.schema';
import { Student, studentSchema } from './../../schemas/student.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Module } from '@nestjs/common';
import { Educator, EducatorSchema } from 'src/schemas/educator.schema';
import { School, SchoolSchema } from 'src/schemas/school.schema';
import { Parent, ParentSchema } from 'src/schemas/parent.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: studentSchema },
      { name: Educator.name, schema: EducatorSchema },
      { name: Parent.name, schema: ParentSchema },
      { name: SchoolTerm.name, schema: SchoolTermSchema },
      { name: School.name, schema: SchoolSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
