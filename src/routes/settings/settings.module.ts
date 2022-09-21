import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SchoolTermSchemaProvider,
  AcademicYearSchemaProvider,
  StudentSchemaProvider,
  EducatorSchemaProvider,
  ParentSchemaProvider,
} from '../../schemas/schemas';
import { SettingsService } from './settings.service';
import { SettingsController } from './setttings.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      SchoolTermSchemaProvider,
      AcademicYearSchemaProvider,
      StudentSchemaProvider,
      EducatorSchemaProvider,
      ParentSchemaProvider,
    ]),
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
