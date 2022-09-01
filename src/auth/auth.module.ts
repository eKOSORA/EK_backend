import { Module } from '@nestjs/common';
import { SignupController } from './controllers/signup/signup.controller';
import { ControllerController } from './controllers/login/controller/controller.controller';
import { SignupService } from './services/signup/signup.service';
import { LoginService } from './controllers/login/login.service';

@Module({
  controllers: [SignupController, ControllerController],
  providers: [SignupService, LoginService]
})
export class AuthModule {}
