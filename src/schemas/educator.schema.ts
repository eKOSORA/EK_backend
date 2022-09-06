import { School } from './school.schema';
import { Subject } from './subject.schema';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type EducatorDocument = Educator & mongoose.Document;

@Schema()
export class Educator {
  @Prop({ type: String })
  names: string;

  @Prop({ type: String })
  code: string;

  @Prop({ type: [String] })
  title: string[];

  @Prop({ type: String })
  tel: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'School' })
  school: School;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }] })
  subjects: Subject[];

  @Prop({ type: String })
  profileLink: string;
}

export const EducatorSchema = SchemaFactory.createForClass(Educator);
