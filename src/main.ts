import { infoEmoji } from './config/oneliners';
import { HttpErrorFilter } from './filters/error.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const chalk = require('chalk');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn'],
  });
  app.useGlobalFilters(new HttpErrorFilter());
  app.use(cookieParser());
  await app.listen(process.env.PORT, () =>
    console.log(chalk.green(infoEmoji, 'Really up')),
  );
}
bootstrap();
