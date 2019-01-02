import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {NoticiaService} from "./noticia/noticia.service";
import {TypeOrmModule} from '@nestjs/typeorm';
import {NoticiaEntity} from "./noticia/noticia-entity";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 32779,
              database: 'bddWeb',
          username:'web',
          password:'12345678',
          synchronize: true,
          entities:[
              NoticiaEntity
          ]

      }
      )

  ],
  controllers: [AppController],
  providers: [AppService,
  NoticiaService
  ],
})
export class AppModule {}
