import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export interface Jwt {
  accountType: string;
  id: string;
  isAdmin: boolean;
  schoolId?: string;
}

export class DefaultResponse {
  @ApiProperty()
  code: string;

  @ApiPropertyOptional()
  message?: string;
}

export class LoginResponse extends DefaultResponse {
  token?: string;
  id?: string;
  isAdmin?: boolean;
}

export class ErrorResponse extends DefaultResponse {
  @ApiProperty({ default: '#Error' })
  code: string;

  @ApiProperty()
  message: string;
}

export class SuccessResponse extends DefaultResponse {
  @ApiProperty({ default: '#Success' })
  code: string;
}

export class ResponseWithResults extends DefaultResponse {
  @ApiProperty()
  results?: object | object[] | string | string[];
}
