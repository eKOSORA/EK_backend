import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './setttings.controller';

@Module({
  imports: [],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
