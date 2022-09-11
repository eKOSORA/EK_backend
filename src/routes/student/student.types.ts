import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ClassObject } from '../../schemas/student.schema';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class StudentBody {
  @IsNotEmpty()
  @ApiProperty()
  names: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ type: mongoose.Types.ObjectId })
  school: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty()
  code: string;

  @IsNotEmpty()
  @ApiProperty({ type: ClassObject })
  class: ClassObject;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}

export class AddStudentBody {
  @ValidateNested()
  @Type(() => StudentBody)
  @IsNotEmptyObject()
  @ApiProperty({ type: [StudentBody] })
  students: StudentBody[];
}

export class LessStudentBody {
  names?: string;
  code?: string;
  class?: ClassObject;
  email?: string;
  parentEmails?: string[];
}

export class EditStudentBody {
  studentId: mongoose.Types.ObjectId;
  updates: LessStudentBody;
}
