import { School } from './school.schema';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Exclude } from 'class-transformer';

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
