import { infoEmoji } from './config/oneliners';
import { HttpErrorFilter } from './filters/error.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
    .setTitle('eKOSORA docs')
    .setDescription('The next URUBUTO but better.')
    .setVersion('2.0')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT, () =>
    console.log(chalk.green(infoEmoji, 'Really up')),
  );
}
bootstrap();
