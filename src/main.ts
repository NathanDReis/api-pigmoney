import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validação global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Porta do servidor
  await app.listen(process.env.PORT || 3000, '0.0.0.0');

  console.log(`🚀 Application is running on: http://localhost:${process.env.PORT || 3000, '0.0.0.0'}`);
}
bootstrap();
