import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import mongoose from 'mongoose';
import { School } from './school.schema';

export type AcademicYearDocument = AcademicYear & Document;

@Schema()
export class AcademicYear {
  @Prop()
  start: Date;

  @Prop()
  end: Date;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'School' })
  school: mongoose.Types.ObjectId | School;

  @Prop({ default: true })
  current: boolean;
}

export const AcademicYearSchema = SchemaFactory.createForClass(AcademicYear);
