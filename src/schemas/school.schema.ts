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
  /* =====> PART 1: BASIC INFO */
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true })
  initials: string;

  @Prop({
    type: String,
    required: true,
    enum: {
      values: ['government-aided', 'government', 'private'],
      message: '{VALUE} is not a valid school type',
    },
  })
  type: string;

  @Prop({
    type: [String],
    required: true,
    enum: {
      values: ['Cambridge', 'REB', 'WDA', 'Other'],
      message: '{VALUE} is not a valid choice of programme',
    },
  })
  programme: string[];

  /* =====> PART 2: WHEREABOUTS */

  @Prop({ type: SchoolAddress, required: true })
  address: SchoolAddress;

  /* =====> PART 3: MORE ABOUT THE SCHOOL */

  @Prop({ type: String })
  head?: string;

  @Prop({ type: String })
  moto?: string;

  @Prop({ type: String })
  profileLink: string;

  @Prop({ type: Date, default: Date.now() })
  joined: Date;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
