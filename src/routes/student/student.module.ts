import { SendGridService } from './../sendgrid/sendgrid.service';
import { Student, studentSchema } from './../../schemas/student.schema';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: studentSchema }]),
  ],
  controllers: [StudentController],
  providers: [StudentService, SendGridService],
})
export class StudentModule {}
