import {
  Announcement,
  AnnouncementSchema,
} from './../../schemas/announcement.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Announcement.name, schema: AnnouncementSchema },
    ]),
  ],
  controllers: [AnnouncementController],
  providers: [AnnouncementService],
})
export class AnnouncementModule {}
