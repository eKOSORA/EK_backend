import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

// export type SchoolDocument =
export class SchoolAddress {
  province: string;
  district: string;
  sector?: string;
  cell?: string;
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
