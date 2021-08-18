import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('service');
  app.useGlobalPipes(new ValidationPipe());
  
  if(!process.env.NODE_ENV)
    process.env.NODE_ENV = 'development'

  if(process.env.NODE_ENV != 'production'){
    console.log(`REST svc running on Port ${config.db.port} on ${config.mode} mode`);
  }

  await app.listen(config.db.port);
}
bootstrap();
