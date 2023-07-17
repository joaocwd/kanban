import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://kanban-production-643d.up.railway.app'],
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
