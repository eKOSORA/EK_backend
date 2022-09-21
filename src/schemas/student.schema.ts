import { obj_without } from './../config/oneliners';
import { SchoolTerm } from './term.schema';
import { School } from './school.schema';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Exclude } from 'class-transformer';
import { Subject } from './subject.schema';
import { ApiProperty } from '@nestjs/swagger';

export type StudentDocument = Student & mongoose.Document;

export class ClassObject {
  @Prop({ type: Number })
  @ApiProperty()
  _year: number;

  @Prop({ type: String })
  @ApiProperty()
  _class: string;
}

export class Record {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' })
  subject: mongoose.Types.ObjectId | Subject;

  @Prop({ type: Date })
  date: Date;

  @Prop({ type: Number })
  max: number;

  @Prop({ type: Number })
  mark: number;

  @Prop({ type: Boolean })
  reversed: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SchoolTerm' })
  term: mongoose.Types.ObjectId | SchoolTerm;
}

const parentLimitCheck = (val: Array<string>): boolean => {
  console.log('VALIDATING :', val);
  return val.length >= 2;
};

@Schema({ strict: true })
export class Student {
  @Prop({ type: String })
  @ApiProperty()
  names: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'School' })
  @ApiProperty()
  school: mongoose.Types.ObjectId | School;

  @Prop({ type: String })
  @ApiProperty()
  code: string;

  @Prop()
  @ApiProperty()
  class: ClassObject;

  @Prop({ default: [] })
  @ApiProperty()
  records: Record[];

  @Prop({ type: String, default: process.env.DEFAULT_PASSWORD })
  @ApiProperty()
  password: string;

  @Prop({ type: String, unique: true })
  @ApiProperty()
  email: string;

  @Prop({
    type: [String],
    default: [],
    validate: [parentLimitCheck, 'Student Can Only Have 2 parents'],
  })
  @ApiProperty()
  parentEmails: string[];

  @Prop({ type: String })
  @ApiProperty()
  profileLink: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);

interface StudentInterface extends Student {
  foo?: string;
}

export class SafeStudent implements StudentInterface {
  @Exclude()
  password: string;

  @ApiProperty()
  _id?: string;

  foo?: string;

  @ApiProperty()
  names: string;

  school: School | mongoose.Types.ObjectId;

  @ApiProperty()
  code: string;

  @ApiProperty()
  class: ClassObject;

  @ApiProperty()
  records: Record[];

  @ApiProperty()
  email: string;

  @ApiProperty()
  parentEmails: string[];

  @ApiProperty()
  profileLink: string;

  constructor(partial: Partial<SafeStudent>, ...without: string[]) {
    Object.assign(this, obj_without(partial, ...without));
  }
}
