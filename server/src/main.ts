import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.enableCors({
    origin: ['https://kanban-production-643d.up.railway.app'],
  });
  await app.listen(3000);
}
bootstrap();
