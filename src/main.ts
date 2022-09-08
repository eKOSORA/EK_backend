import { infoEmoji, isProd, sys_notification } from './config/oneliners';
import { HttpErrorFilter } from './filters/error.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const chalk = require('chalk');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn'],
  });
  app.useGlobalFilters(new HttpErrorFilter());
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .addCookieAuth('jwt')
    .setTitle('eKOSORA docs')
    .setDescription('The next URUBUTO but better.')
    .setVersion('2.0')
    .addTag('auth', 'Authentication related routes')
    .addTag('student', 'Student related routes')
    .addTag('educator', 'Educator related routes')
    .addTag('parent', 'Parent related routes')
    .addTag('announcement', 'Announcement related routes')
    .addTag('settings', 'Settings related routes')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT, () => {
    console.log(chalk.green(infoEmoji, 'Really up'));
    console.log(isProd());
    if (!isProd()) {
      sys_notification('nestjs', 'Server is UP');
    }
  });
}
bootstrap();
