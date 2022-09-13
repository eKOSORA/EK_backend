import { ApiProperty } from '@nestjs/swagger';

export interface Jwt {
  accountType: string;
  id: string;
  isAdmin: boolean;
  schoolId?: string;
}

export class DefaultResponse {
  @ApiProperty()
  code: string;

  @ApiProperty()
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
}

export class SuccessResponse extends DefaultResponse {
  @ApiProperty({ default: '#Success' })
  code: string;
}
