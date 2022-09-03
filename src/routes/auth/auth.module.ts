import { School, SchoolSchema } from './../../schemas/school.schema';
import { Student, studentSchema } from '../../schemas/student.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: studentSchema },
      { name: School.name, schema: SchoolSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
