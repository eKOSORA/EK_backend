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
  @ApiProperty({})
  names?: string;

  @ApiProperty({})
  code?: string;

  @ApiProperty({ type: ClassObject })
  class?: ClassObject;

  @ApiProperty({})
  email?: string;

  @ApiProperty({})
  parentEmails?: string[];
}

export class EditStudentBody {
  @ApiProperty()
  studentId: string;

  @ApiProperty({ type: LessStudentBody })
  updates: LessStudentBody;
}

export class AddRecordBody {
  @ApiProperty()
  @IsNotEmpty()
  _class: string;

  @ApiProperty()
  @IsNotEmpty()
  _year: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  subject: string;

  @ApiProperty()
  @IsNotEmpty()
  max: number;

  @ApiProperty()
  @IsNotEmpty()
  reversed: boolean;

  @ApiProperty()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  term: string | mongoose.Types.ObjectId;
}
