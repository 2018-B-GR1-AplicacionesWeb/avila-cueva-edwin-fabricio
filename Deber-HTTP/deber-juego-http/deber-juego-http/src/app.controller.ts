import {Body, Controller, Get, Post, Res} from '@nestjs/common';
import { AppService } from './app.service';
import {Observable,of,from} from "rxjs";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /////////////////////INICILIZAR LA BASE ////////////////
  @Get('inicializarLaBase')
  main(): Observable<any>{
      const respuestaBDD$ = from(this.appService.inicializarBase());
      return respuestaBDD$;
  }

  ///////////////////// CREAR EMPRESA ////////////////
  @Post('crearEmpresa')
  crearEmpresa(
      @Body() empresa:Empresa,
  ){
      const respuestaBDD$ = from(this.appService.crearEmpresa(empresa));
      return respuestaBDD$;
  }


}

interface RespuestaBDD {
    mensaje: string;
    bdd: BDD;
    opcionMenu?: OpcionMenu;
    empresa?: Empresa;
    indiceEmpresa?: number;
}

interface BDD {
    empresas: Empresa[] | any;
    juegos: Juego[];
}

export interface Empresa {
    nombre: string;
}

interface Juego {
    id: number;
    nombre: string;
    idUsuario: number;
}

interface OpcionMenu {
    opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar';
}

interface BuscarUsuarioPorId {
    idUsuario: string;
}

interface BuscarUsuarioPorNombre {
    nombre: string;
}

interface EliminarPorNombre {
    nombre: string;
}
