import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {Logger, ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('/Main')

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
  );

  const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Api NestJS 2 Leccion 1')
      .setDescription('NestJS 2 leccion 1')
      .setVersion('1.0')
      .addTag('api')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 5000

  logger.log(`Api corriendo en el puerto ${port}`)

  await app.listen(port);
}
bootstrap();
