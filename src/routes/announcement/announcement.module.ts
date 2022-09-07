import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AnnouncementController],
  providers: [AnnouncementService],
})
export class AnnouncementModule {}
