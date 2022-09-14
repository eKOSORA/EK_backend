import { ParentService } from './../parent/parent.service';
import { Parent, ParentSchema } from '../../schemas/parent.schema';
import { SendGridService } from './../sendgrid/sendgrid.service';
import { Student, studentSchema } from './../../schemas/student.schema';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: studentSchema },
      { name: Parent.name, schema: ParentSchema },
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService, SendGridService, ParentService],
})
export class StudentModule {}
