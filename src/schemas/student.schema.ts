import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type StudentDocument = Student & mongoose.Document;

export class ClassObject {
  _year: number;
  _class: string;
}

export class Record {
  name: string;
  subject: mongoose.Schema.Types.ObjectId;
  date: Date;
  max: number;
  mark: number;
  reversed: boolean;
}

@Schema()
export class Student {
  @Prop()
  names: string;

  @Prop()
  code: string;

  @Prop()
  class: ClassObject;

  @Prop()
  records: Record[];

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  parentEmails: string[];

  @Prop()
  profileLink: string;
}

export const studentSchema = SchemaFactory.createForClass(Student);
