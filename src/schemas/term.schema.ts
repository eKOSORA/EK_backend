import { AcademicYear } from './academicYear.schema';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { School } from './school.schema';

export type SchoolTermDocument = SchoolTerm & Document;

@Schema()
export class SchoolTerm {
  @Prop()
  start: Date;

  @Prop()
  end: Date;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'School' })
  school: School;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'AcademicYear' })
  academicYear: AcademicYear;

  @Prop({ default: true })
  current: boolean;
}

export const SchoolTermSchema = SchemaFactory.createForClass(SchoolTerm);
