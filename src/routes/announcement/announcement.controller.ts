import { Get, Post } from '@nestjs/common';
import { ProtectedController } from 'src/custom/custom.decorators';

@ProtectedController('jwt', 'announcement')
export class AnnouncementController {
  @Get('/getAll')
  getAllAnnouncements() {
    return { code: '#UnDocument' };
  }

  @Post('/new')
  newAnnouncement() {
    return { code: '#UnDocument' };
  }
}
