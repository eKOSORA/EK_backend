import { SendGridService } from './../sendgrid/sendgrid.service';
import { Parent, ParentSchema } from '../../schemas/parent.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ParentService } from './parent.service';
import { ParentController } from './parent.controller';
import { Module } from '@nestjs/common';
import { Student, StudentSchema } from '../../schemas/student.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Parent.name, schema: ParentSchema },
      { name: Student.name, schema: StudentSchema },
    ]),
  ],
  controllers: [ParentController],
  providers: [ParentService, SendGridService],
})
export class ParentModule {}
