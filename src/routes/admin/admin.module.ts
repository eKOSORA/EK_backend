import { SchoolTerm, SchoolTermSchema } from './../../schemas/term.schema';
import { Student, StudentSchema } from './../../schemas/student.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Module } from '@nestjs/common';
import { Educator, EducatorSchema } from './../../schemas/educator.schema';
import { School, SchoolSchema } from './../../schemas/school.schema';
import { Parent, ParentSchema } from './../../schemas/parent.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
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
