import { SignupBody } from './signupBody.dto';
import { DefaultResponse, ErrorResponse, SuccessResponse } from './auth.types';
import { LoginBody } from './loginBody.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTToken } from 'src/custom/custom.decorators';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in',
    type: SuccessResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Something went wrong.',
    type: ErrorResponse,
  })
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
      return res.status(400).json({
        ...result,
        token: undefined,
        id: undefined,
        isAdmin: undefined,
      });

    res.cookie('jwt', result.token, { maxAge: 2 * 60 * 60 * 1000 });
    return res
      .status(200)
      .json({ ...result, token: undefined, id: undefined, isAdmin: undefined });
  }

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signup(@Body() body: SignupBody) {
    const result = await this.authService.signupSchool(body);
    return result;
  }

  @Get('/logout')
  @ApiOkResponse({
    description: 'Successfully logged out',
    type: SuccessResponse,
  })
  logout(@Res() res: Response) {
    res.cookie('jwt', 'none', { maxAge: 1 });
    res
      .status(200)
      .json({ code: '#Success', message: 'Successfully logged out' });
  }
}
