import { SettingsService } from './settings.service';
import { Post, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProtectedController } from '../../custom/custom.decorators';

@ProtectedController('jwt', 'settings')
@ApiTags('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}
  @Post('/updateProfile')
  updateProfile() {
    return { code: '#UnDocumented' };
  }

  @Post('/newTerm')
  newTerm() {
    return { code: '#UnDocumented' };
  }

  @Get('/terms')
  getTerms() {
    return { code: '#UnDocumented' };
  }

  @Get('/test')
  testFunc() {
    this.settingsService.testFunc();
    return { code: '#UnDocumented' };
  }
}
