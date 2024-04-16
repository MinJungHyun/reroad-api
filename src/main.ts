import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { SwaggerSetting } from './swagger.setting';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // SwaggerSetting(app);
  await app.listen(3010);
}
bootstrap();
