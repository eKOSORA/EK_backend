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

// eslint-disable-next-line @typescript-eslint/no-var-requires
const chalk = require('chalk');

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.local' }),
    MongooseModule.forRoot(process.env.DB_CONN_STR),
    AuthModule,
    AdminModule,
    StudentModule,
  ],
  controllers: [],
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
