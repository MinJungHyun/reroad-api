import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { SwaggerSetting } from './swagger.setting';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // SwaggerSetting(app);
  app.enableCors({
    origin: true, //여기에 url을 넣어도된다.
    credentials: true
  });
  app.setGlobalPrefix('api');
  await app.listen(3010);
}
bootstrap();
