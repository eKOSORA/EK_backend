import { Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProtectedController } from '../../custom/custom.decorators';

@ProtectedController('jwt', 'settings')
@ApiTags('settings')
export class SettingsController {
  @Post('/updateProfile')
  updateProfile() {
    return { code: '#UnDocumented' };
  }
  @Post('/newTerm')
  newTerm() {
    return { code: '#UnDocumented' };
  }
}
