import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import * as mongoose from 'mongoose';

export type SchoolDocument = School & mongoose.Document;

export class SchoolAddress {
  @IsNotEmpty()
  @IsString()
  province: string;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsString()
  sector?: string;

  @IsString()
  cell?: string;

  @IsString()
  village?: string;
}

@Schema()
export class School {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  initials: string;

  @Prop({ type: String, required: true })
  address: SchoolAddress;

  @Prop({ type: String })
  moto?: string;

  @Prop({ type: String })
  head?: string;

  @Prop({ type: String, required: true })
  status: string;

  @Prop({ type: String, required: true, enum: ['Cambridge', 'REB', 'Other'] })
  programme: string;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
