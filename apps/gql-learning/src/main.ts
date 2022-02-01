import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app/app.module';
import { config } from './app/core/config';
import { setupApp } from './setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  await setupApp(app);

  const logger = app.get(Logger);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(config.port);
  logger.log(`Application is running on: ${await app.getUrl()}, playground on: ${await app.getUrl()}/graphql`);
}

bootstrap();
