import { ApiProperty } from '@nestjs/swagger';
import { DefaultResponse } from '../../config/global.interface';

export class DefaultAuthResponse extends DefaultResponse {
  token?: string;
}
