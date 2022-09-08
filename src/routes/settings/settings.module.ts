import { SettingsService } from './settings.service';
import { SettingsController } from './setttings.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
