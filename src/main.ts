if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Auto details store API')
    .setDescription('Documentations REST API')
    .setVersion('1.0.0')
    .addServer('http://localhost:5000')
    .addBearerAuth({
      type: 'http',
      description: 'Enter JWT token',
      scheme: 'bearer',
      name: 'Authorization',
      in: 'header',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(PORT);
  console.log(`The server is starting on http://localhost:${PORT}/api/docs`);
}
bootstrap();
