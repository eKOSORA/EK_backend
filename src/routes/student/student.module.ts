import { Module } from '@nestjs/common';
import { EducatorService } from './../educator/educator.service';
import { ParentService } from './../parent/parent.service';
import { SendGridService } from './../sendgrid/sendgrid.service';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports: [],
  controllers: [StudentController],
  providers: [StudentService, SendGridService, ParentService, EducatorService],
})
export class StudentModule {}
