import { MongooseModule } from '@nestjs/mongoose';
import { EducatorService } from './educator.service';
import { EducatorController } from './educator.controller';
import { Module } from '@nestjs/common';
import { Educator, EducatorSchema } from '../../schemas/educator.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Educator.name, schema: EducatorSchema },
    ]),
  ],
  controllers: [EducatorController],
  providers: [EducatorService],
})
export class EducatorModule {}
