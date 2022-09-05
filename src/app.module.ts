import { AdminModule } from './routes/admin/admin.module';
import { Parent, ParentSchema } from './schemas/parent.schema';
import {
  CookieCheckMW,
  RemoveCookiesMW,
} from './middleware/cookies.middleware';
import { AuthModule } from './routes/auth/auth.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './routes/student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.local' }),
    MongooseModule.forRoot(process.env.DB_CONN_STR),
    AuthModule,
    AdminModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieCheckMW).exclude('auth/(.*)');
    consumer.apply(RemoveCookiesMW).forRoutes('auth/(.*)');
  }
  constructor() {
    console.log('SERVER UP AND RUNNING');
  }
}
