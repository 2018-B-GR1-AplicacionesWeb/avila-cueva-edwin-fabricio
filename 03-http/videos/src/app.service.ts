import { Injectable } from '@nestjs/common';
import {Usuario} from "./app.controller";

@Injectable()
export class AppService {
  bdd: Usuario[] = [];//archvivo. JSON
  crearUsuario(usuario: Usuario){
    this.bdd.push(usuario);
    return this.bdd;
  }

}
