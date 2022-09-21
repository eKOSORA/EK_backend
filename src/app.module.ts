import { ParentModule } from './routes/parent/parent.module';
import { SettingsModule } from './routes/settings/settings.module';
import { AnnouncementModule } from './routes/announcement/announcement.module';
import { EducatorModule } from './routes/educator/educator.module';
import { AppController } from './app.controller';
import { infoEmoji } from './config/oneliners';
import { AdminModule } from './routes/admin/admin.module';
import {
  CookieCheckMW,
  RemoveCookiesMW,
} from './middleware/cookies.middleware';
import { AuthModule } from './routes/auth/auth.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './routes/student/student.module';
import {
  AcademicYear,
  AcademicYearSchema,
} from './schemas/academicYear.schema';
import { Educator, EducatorSchema } from './schemas/educator.schema';
import { Parent, ParentSchema } from './schemas/parent.schema';
import { Student, StudentSchema } from './schemas/student.schema';
import { SchoolTerm, SchoolTermSchema } from './schemas/term.schema';
import {
  AcademicLevel,
  AcademicLevelSchema,
} from './schemas/academicLevel.schema';
import {
  Announcement,
  AnnouncementSchema,
} from './schemas/announcement.schema';
import { Subject, SubjectSchema } from './schemas/subject.schema';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const chalk = require('chalk');

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.DB_CONN_STR),
    AuthModule,
    AdminModule,
    StudentModule,
    EducatorModule,
    ParentModule,
    AnnouncementModule,
    SettingsModule,
    MongooseModule.forFeature([
      { name: SchoolTerm.name, schema: SchoolTermSchema },
      { name: AcademicYear.name, schema: AcademicYearSchema },
      { name: Student.name, schema: StudentSchema },
      { name: Educator.name, schema: EducatorSchema },
      { name: Parent.name, schema: ParentSchema },
      { name: AcademicYear.name, schema: AcademicYearSchema },
      { name: AcademicLevel.name, schema: AcademicLevelSchema },
      { name: Announcement.name, schema: AnnouncementSchema },
      { name: Subject.name, schema: SubjectSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieCheckMW).exclude('auth(.*)').forRoutes('*');
    consumer.apply(RemoveCookiesMW).forRoutes('auth/(.*)');
  }
  constructor() {
    console.log(chalk.yellow(infoEmoji, 'Starting up...'));
  }
}
