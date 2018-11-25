import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser('megustan los tacos'//secreto
      , {//opciones
        signed:true,
      }));
  await app.listen(3000);
}
bootstrap();
