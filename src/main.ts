import { NestFactory } from '@nestjs/core';
import { AppModule, GameModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3333);

  const app1 = await NestFactory.create(GameModule);
  await app.listen(3334);
}
bootstrap();
