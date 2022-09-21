import { Module } from '@nestjs/common';
import { SendGridService } from './../sendgrid/sendgrid.service';
import { ParentController } from './parent.controller';
import { ParentService } from './parent.service';

@Module({
  imports: [],
  controllers: [ParentController],
  providers: [ParentService, SendGridService],
})
export class ParentModule {}
