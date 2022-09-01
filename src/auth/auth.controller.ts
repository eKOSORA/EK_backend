import { LoginBody } from './loginBody.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(@Inject() private readonly authService: AuthService) {}

  @Post('/login')
  @UsePipes(ValidationPipe)
  login(@Body() body: LoginBody) {
    console.log(body);
    return { code: '#Success' };
  }

  @Post('/signup')
  signup() {
    return { code: '#NotConfigured' };
  }
}
