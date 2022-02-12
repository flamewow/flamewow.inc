import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { PrismaService } from './app/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const swaggerConfig = new DocumentBuilder().setTitle('Prisma Learning').setDescription('prisma learning api sample').setVersion('1.0').build();
  const openApiDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api-docs', app, openApiDoc);

  const port = process.env.PORT || 3334;
  await app.listen(port);

  Logger.log(`Application is running on: ${await app.getUrl()}, swagger on: ${await app.getUrl()}/api-docs`);
}

bootstrap();
