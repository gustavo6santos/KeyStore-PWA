import { NestFactory } from '@nestjs/core';
import { AppModule, GameModule, ReviewAppModule, ShopAppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3333);

  const app1 = await NestFactory.create(GameModule);
  await app1.listen(3334);

  const app2 = await NestFactory.create(ReviewAppModule);
  await app2.listen(3335);

  const app3 = await NestFactory.create(ShopAppModule);
  await app2.listen(3336);
  
}
bootstrap();
