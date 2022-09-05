import { SignupBody } from './signupBody.dto';
import { DefaultResponse } from './auth.types';
import { LoginBody } from './loginBody.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(
    @Body() { accountType, emailorcode, password, school }: LoginBody,
    @Res() res: Response,
  ): Promise<Response> {
    const result: DefaultResponse = await this.authService.login(
      accountType,
      emailorcode,
      password,
      school,
    );
    if (result.code !== '#Success')
      return res
        .status(400)
        .json({ ...result, token: undefined, id: undefined });

    res.cookie('jwt', result.token, { maxAge: 2 * 60 * 60 * 1000 });
    return res.status(200).json({ ...result, token: undefined, id: undefined });
  }

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signup(@Body() body: SignupBody) {
    const result = await this.authService.signupSchool(body);
    return result;
  }
}
