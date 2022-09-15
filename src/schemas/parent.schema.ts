import { Student } from './student.schema';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type ParentDocument = Parent & mongoose.Document;

@Schema()
export class Parent {
  @Prop({ type: String })
  names: string;

  @Prop({ type: String })
  tel: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }] })
  children: mongoose.Types.ObjectId[] | Student[];

  @Prop({ type: String })
  profileLink: string;
}

export const ParentSchema = SchemaFactory.createForClass(Parent);
