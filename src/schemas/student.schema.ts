import { SchoolTerm } from './term.schema';
import { School } from './school.schema';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Exclude } from 'class-transformer';
import { Subject } from './subject.schema';

export type StudentDocument = Student & mongoose.Document;

export class ClassObject {
  @Prop({ type: Number })
  _year: number;

  @Prop({ type: String })
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

  @Prop()
  records: Record[];

  @Prop({ type: String })
  password: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String })
  parentEmails: string[];

  @Prop({ type: String })
  profileLink: string;
}

export const studentSchema = SchemaFactory.createForClass(Student);

export class SafeStudent extends Student {
  @Exclude()
  password: string;

  constructor(partial: Partial<SafeStudent>) {
    super();
    Object.assign(this, partial);
  }
}
