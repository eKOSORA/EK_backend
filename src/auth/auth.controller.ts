import { AuthService } from './auth.service';
import { Controller, Inject, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(@Inject() private readonly authService: AuthService) {}

  @Post('/login')
  login() {
    return { code: '#Success' };
  }

  @Post('/signup')
  signup() {
    return { code: '#NotConfigured' };
  }
}
