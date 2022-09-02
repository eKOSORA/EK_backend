import { HttpErrorFilter } from './filters/error.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new HttpErrorFilter());
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
