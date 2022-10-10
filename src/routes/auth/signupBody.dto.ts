import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SchoolAddress } from './../../schemas/school.schema';

export class SignupBody {
  constructor(...params) {
    console.log('CALLED', params);
  }
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  initials: string;

  @ValidateNested()
  @Type(() => SchoolAddress)
  @IsNotEmpty()
  @IsObject()
  @IsNotEmptyObject()
  @ApiProperty({ type: SchoolAddress })
  address: SchoolAddress;

  @IsString()
  @ApiProperty()
  moto?: string;

  @IsString()
  @ApiProperty()
  head?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    enum: ['government', 'government-aided', 'private'],
  })
  type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    enum: ['REB', 'WDA', 'Cambridge', 'Other'],
  })
  programme: string;

  @ApiProperty({ type: 'file' })
  profile: Express.Multer.File;
}
