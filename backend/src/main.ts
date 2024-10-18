import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import * as path from 'path';
import { NestExpressApplication } from "@nestjs/platform-express";
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useStaticAssets(path.join(__dirname, '../'));
  app.setGlobalPrefix("/api/v1/");
  app.enableCors();
  await app.listen(8000);
}
bootstrap();
