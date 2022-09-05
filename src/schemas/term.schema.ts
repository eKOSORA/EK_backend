import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SchoolTermDocument = SchoolTerm & Document;

@Schema()
export class SchoolTerm {
  @Prop()
  start: Date;

  @Prop()
  end: Date;
}

export const SchoolTermSchema = SchemaFactory.createForClass(SchoolTerm);
