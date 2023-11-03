import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors();
  await app.listen(process.env.SERVER_PORT, process.env.IP_ADDRESS);
  console.log(
    `SERVER RUNNING AT:\nPORT:${process.env.SERVER_PORT}\nIP:${process.env.IP_ADDRESS}`,
  );
}
bootstrap();
