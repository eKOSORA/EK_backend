import { IsNotEmpty } from 'class-validator';
export class LoginBody {
  @IsNotEmpty()
  accountType: string;

  @IsNotEmpty()
  emailorcode: string;

  @IsNotEmpty()
  password: string;
}
