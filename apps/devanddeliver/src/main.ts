import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ServerConfig } from '@dad/config';

async function bootstrap() {
  const logger = new Logger('APP');

  const app = await NestFactory.create(AppModule, { logger });
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const docsConfig = new DocumentBuilder().setTitle('DevAndDeliver SWAPI').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, docsConfig, {
    include: [AppModule],
    deepScanRoutes: true,
  });
  SwaggerModule.setup(`docs`, app, document);

  const port = app.get(ServerConfig).port;

  await app.listen(port);
  logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}

bootstrap();
