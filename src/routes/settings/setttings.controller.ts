import { OnlyAdminGuard } from './../../guards/admin.guard';
import { TermBody } from './settings.types';
import { Jwt, SomeUserSchema } from './../../config/global.interface';
import { SettingsService } from './settings.service';
import { Post, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  DefaultApiResponses,
  JWTToken,
  ProtectedController,
} from '../../custom/custom.decorators';

@ProtectedController('jwt', 'settings')
@ApiTags('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post('/update')
  @DefaultApiResponses('Successfully updated', 'Failed to update')
  updateProfile(@JWTToken() token: Jwt, @Body() body: Partial<SomeUserSchema>) {
    return this.settingsService.updateInfo(token.id, token.accountType, body);
  }

  @Post('/newTerm')
  @UseGuards(OnlyAdminGuard)
  @DefaultApiResponses(
    'Successfully created new term',
    'Failed to create new term',
  )
  newTerm(@JWTToken() token: Jwt, @Body() body: TermBody) {
    return this.settingsService.createTerm(token.schoolId, body);
  }

  @Get('/terms')
  getTerms(@JWTToken() token: Jwt) {
    return this.settingsService.getRecentTerms(token.schoolId);
  }
}
