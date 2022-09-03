import { School } from './school.schema';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type StudentDocument = Student & mongoose.Document;

export class ClassObject {
  _year: number;
  _class: string;
}

export class Record {
  id: mongoose.Schema.Types.ObjectId;
  name: string;
  subject: mongoose.Schema.Types.ObjectId;
  date: Date;
  max: number;
  mark: number;
  reversed: boolean;
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

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  parentEmails: string[];

  @Prop({ type: String })
  profileLink: string;
}

export const studentSchema = SchemaFactory.createForClass(Student);
