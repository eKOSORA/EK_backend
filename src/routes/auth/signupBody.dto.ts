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
  name: string;

  @IsNotEmpty()
  @IsString()
  initials: string;

  @ValidateNested()
  @Type(() => SchoolAddress)
  @IsNotEmpty()
  @IsNotEmptyObject()
  address: SchoolAddress;

  @IsString()
  moto?: string;

  @IsString()
  head?: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  programme: string;
}
