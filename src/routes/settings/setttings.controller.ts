import { Post } from '@nestjs/common';
import { ProtectedController } from 'src/custom/custom.decorators';

@ProtectedController('jwt', 'settings')
export class SettingsController {
  @Post('/updateProfile')
  updateProfile() {
    return { code: '#UnDocument' };
  }
  @Post('/newTerm')
  newTerm() {
    return { code: '#UnDocument' };
  }
}
