import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {NoticiaService} from "./noticia/noticia.service";
import {TypeOrmModule} from '@nestjs/typeorm';
import {NoticiaEntity} from "./noticia/noticia-entity";
import {NoticiaModule} from "./noticia/noticia.module";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 32769,
              database: 'bddWeb',
          username:'web',
          password:'12345678',
          synchronize: true,
          dropSchema: true,
          entities:[
              NoticiaEntity
          ]

      }
      ),
      NoticiaModule

  ],//Modulos
  controllers: [AppController
  ],//Controllers
  providers: [AppService,

  ],//Servicios
})
export class AppModule {}
