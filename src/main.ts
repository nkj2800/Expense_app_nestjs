import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // will not allow properties other than the ones listed in the dtos to enter through the request body
    transform: true, // tells nest transform the response object
    transformOptions: {
      enableImplicitConversion: true
    }
  }))

  await app.listen(3000);
}
bootstrap();
