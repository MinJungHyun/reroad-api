import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { SwaggerSetting } from './swagger.setting';

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL || 'http://localhost:3000';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // SwaggerSetting(app);
  app.enableCors({
    origin: [FRONTEND_BASE_URL],
    credentials: true,
    exposedHeaders: ['Authorization'] // * 사용할 헤더 추가.
  });
  app.setGlobalPrefix('api');
  await app.listen(3010);
}
bootstrap();
