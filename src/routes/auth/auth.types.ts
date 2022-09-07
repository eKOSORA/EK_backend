import { ApiProperty } from '@nestjs/swagger';

export class DefaultResponse {
  @ApiProperty()
  code: string;

  @ApiProperty()
  message?: string;

  token?: string;
}

export class LoginResponse extends DefaultResponse {
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
