import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SchoolAddress } from './../../schemas/school.schema';

export class SignupBody {
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
  @IsNotEmptyObject()
  @ApiProperty()
  address: SchoolAddress;

  @IsString()
  @ApiProperty()
  moto?: string;

  @IsString()
  @ApiProperty()
  head?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  status: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  programme: string;
}
