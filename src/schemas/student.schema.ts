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
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' })
  subject: Subject;

  @Prop({ type: Date })
  date: Date;

  @Prop({ type: Number })
  max: number;

  @Prop({ type: Number })
  mark: number;

  @Prop({ type: Boolean })
  reversed: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SchoolTerm' })
  term: SchoolTerm;
}

@Schema()
export class Student {
  @Prop({ type: String })
  names: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'School' })
  school: School;

  @Prop({ type: String })
  code: string;

  @Prop()
  class: ClassObject;

  @Prop({ default: [] })
  records: Record[];

  @Prop({ type: String, default: process.env.DEFAULT_PASSWORD })
  password: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String, default: [] })
  parentEmails: string[];

  @Prop({ type: String })
  profileLink: string;
}

export const studentSchema = SchemaFactory.createForClass(Student);

interface StudentInterface extends Student {
  foo?: string;
}

export class SafeStudent implements StudentInterface {
  @Exclude()
  password: string;

  _id?: string;
  foo?: string;
  names: string;
  school: School;
  code: string;
  class: ClassObject;
  records: Record[];
  email: string;
  parentEmails: string[];
  profileLink: string;

  constructor(partial: Partial<SafeStudent>, ...without: string[]) {
    Object.assign(this, obj_without(partial, ...without));
  }
}
