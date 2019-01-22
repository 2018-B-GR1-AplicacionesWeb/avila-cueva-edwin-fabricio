import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {NoticiaService} from "./noticia/noticia.service";
import {TypeOrmModule} from '@nestjs/typeorm';
import {NoticiaEntity} from "./noticia/noticia-entity";
import {NoticiaModule} from "./noticia/noticia.module";
import {PaginaEntity} from "./noticia/pagina/pagina.entity";
import {ArticuloEntity} from "./noticia/articulo/articulo.entity";
import {UsuarioEntity} from "./noticia/usuario/usuario.entity";
import {UsuarioModule} from "./noticia/usuario/usuario.module";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port:  32769,
              database: 'bddWeb',
          username:'web',
          password:'12345678',
          synchronize: true,
          dropSchema: false,
          entities:[
              NoticiaEntity,
              PaginaEntity,
              ArticuloEntity,
              UsuarioEntity
          ]

      }
      ),
      NoticiaModule,
      UsuarioModule

  ],//Modulos
  controllers: [AppController
  ],//Controllers
  providers: [AppService,

  ],//Servicios
})
export class AppModule {}
