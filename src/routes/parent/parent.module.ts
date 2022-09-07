import { ParentService } from './parent.service';
import { ParentController } from './parent.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ParentController],
  providers: [ParentService],
})
export class ParentModule {}
