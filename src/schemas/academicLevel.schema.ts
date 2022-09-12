import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { School } from './school.schema';
import { Subject } from './subject.schema';

@Schema()
export class AcademicLevel {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'School' })
  school: School;

  @Prop()
  year: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }] })
  subjects: Subject[];
}

export const AcademicLevelSchema = SchemaFactory.createForClass(AcademicLevel);
