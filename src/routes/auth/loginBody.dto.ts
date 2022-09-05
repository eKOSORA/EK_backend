import { IsMongoId, IsNotEmpty, ValidateIf } from 'class-validator';
export class LoginBody {
  @IsNotEmpty()
  accountType: string;

  @IsNotEmpty()
  emailorcode: string;

  @IsNotEmpty()
  password: string;

  @ValidateIf(({ school }) => !!school)
  @IsMongoId({ message: 'school paremeter must be a mongodb ID' })
  school?: string;
}
