import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Educator } from '../../schemas/educator.schema';

export class AddEducatorBody {
  @ApiProperty()
  names: string;

  @ApiPropertyOptional()
  code?: string;

  @ApiProperty()
  title: string[];

  @ApiPropertyOptional()
  tel?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  school: string;

  @ApiPropertyOptional()
  subjects?: string;
}

export class EditEducatorBody {
  @ApiProperty()
  educatorId: string;

  @ApiProperty({ type: PartialType<Educator> })
  updates: Partial<Educator>;
}
