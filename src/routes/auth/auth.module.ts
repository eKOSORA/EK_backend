import { Educator, EducatorSchema } from '../../schemas/educator.schema';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Parent, ParentSchema } from '../../schemas/parent.schema';
import { School, SchoolSchema } from '../../schemas/school.schema';
import { Student, studentSchema } from '../../schemas/student.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: studentSchema },
      { name: School.name, schema: SchoolSchema },
      { name: Parent.name, schema: ParentSchema },
      { name: Educator.name, schema: EducatorSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
