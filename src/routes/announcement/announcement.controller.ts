import { Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProtectedController } from '../../custom/custom.decorators';

@ProtectedController('jwt', 'announcement')
@ApiTags('announcement')
export class AnnouncementController {
  @Get('/getAll')
  getAllAnnouncements() {
    return { code: '#UnDocumented' };
  }

  @Post('/new')
  newAnnouncement() {
    return { code: '#UnDocumented' };
  }
}
